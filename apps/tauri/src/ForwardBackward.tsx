import { getExecutingEnvironment } from "@app/resolveModule/env";
import Icon from "@components/Atoms/Icon";
import Tooltip from "@components/Atoms/Tooltip";
import WorkspaceService from "@core-ui/ContextServices/Workspace";
import useWatch from "@core-ui/hooks/useWatch";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import t from "@ext/localization/locale/translate";
import type { WorkspacePath } from "@ext/workspace/WorkspaceConfig";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useCallback, useEffect, useState } from "react";

const isMacOsDesktop = navigator.userAgent.includes("Mac") && getExecutingEnvironment() === "tauri";

const Wrapper = styled.div<{ leftPad?: number; fixedPad?: boolean }>`
	position: absolute;
	${(p) =>
		p.fixedPad
			? css`
					left: ${p.leftPad}rem;
			  `
			: css`
					left: max(${p.leftPad}rem, calc(50% - 85.4rem / 2));
			  `}
	top: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: var(--z-index-header-navigation);
	gap: 0 0.3rem;

	> * {
		padding: 0 0.1rem;
	}
`;

const OpacityIcon = styled(Icon)<{ disabled?: boolean }>`
	color: var(--color-primary);

	cursor: pointer;
	opacity: 0.5;

	${({ disabled }) =>
		disabled &&
		css`
			opacity: 0.2;
			cursor: unset;
		`}
`;

type History = {
	url: string;
	workspace: WorkspacePath;
};

const loadHistory = (): { history: History[]; current: number } => {
	const savedHistory = typeof window !== "undefined" && window.sessionStorage.getItem("history");

	if (savedHistory) {
		try {
			return JSON.parse(savedHistory);
		} catch {
			return { history: [], current: -1 };
		}
	}

	return { history: [], current: -1 };
};

const saveHistory = (history: History[], current: number) => {
	window.sessionStorage.setItem("history", JSON.stringify({ history, current }));
};

export const useHistory = () => {
	if (!isMacOsDesktop) return null;

	const [history, setHistory] = useState<History[]>(null);
	const [current, setCurrent] = useState<number>(null);

	useEffect(() => {
		if (history !== null && current !== null) return;
		const { history: savedHistory, current: savedCurrent } = loadHistory();
		setCurrent(savedCurrent);
		setHistory(savedHistory);
	}, []);

	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		const window = getCurrentWindow();
		const unlisten = window.onResized(async () => {
			setIsFullscreen(await window.isFullscreen());
		});
		return () => void unlisten.then((unlisten) => unlisten());
	}, []);

	return {
		history,
		setHistory,
		current,
		setCurrent,
		isFullscreen,
	};
};

export type ForwardBackwardProps = ReturnType<typeof useHistory> & {
	location: string;
	setLocation: (location: string) => void;
};

const ForwardBackward = ({
	history,
	setHistory,
	current,
	setCurrent,
	isFullscreen,
	location,
	setLocation,
}: ForwardBackwardProps) => {
	if (!isMacOsDesktop) return null;

	const workspace = WorkspaceService.current();

	const canGoForward = history.length <= 1 || current === history.length - 1 || current == history.length;
	const canGoBackward = history.length <= 1 || current == 0;

	useWatch(() => {
		const entry = history[current];

		if (!workspace?.path) return;

		if (location !== entry?.url || workspace?.path !== entry?.workspace) {
			setHistory((prev) => [...prev.slice(0, current + 1), { url: location, workspace: workspace.path }]);
			setCurrent((prev) => prev + 1);
		}
	}, [location]);

	useWatch(() => saveHistory(history, current), [history, current]);

	const navigate = useCallback(
		async (direction: "forward" | "backward") => {
			const offset = direction === "forward" ? 1 : -1;
			const next = current + offset;

			if (next >= 0 && next < history.length) {
				const entry = history[next];
				if (!entry) return;

				if (workspace?.path && entry.workspace && workspace.path !== entry.workspace) {
					await WorkspaceService.setActive(workspace.path, false);
				}

				setLocation(entry.url);
				setCurrent(next);
			}
		},
		[history, workspace?.path, current, setLocation],
	);

	return (
		<Wrapper leftPad={isFullscreen ? 0.7 : 5.3} fixedPad>
			<Tooltip content={t("backward")}>
				<OpacityIcon disabled={canGoBackward} onClick={() => navigate("backward")} code="arrow-left" />
			</Tooltip>
			<Tooltip content={t("forward")}>
				<OpacityIcon disabled={canGoForward} onClick={() => navigate("forward")} code="arrow-right" />
			</Tooltip>
		</Wrapper>
	);
};

export default ForwardBackward;
