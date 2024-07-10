import { parseButton } from "@components/List/ButtonItem";
import LoadingListItem from "@components/List/LoadingListItem";
import { SearchElement } from "@components/List/Search";
import { classNames } from "@components/libs/classNames";
import styled from "@emotion/styled";
import {
	HTMLAttributes,
	MouseEventHandler,
	MutableRefObject,
	ReactNode,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import Tooltip from "@components/Atoms/Tooltip";
import ErrorHandler from "@ext/errorHandlers/client/components/ErrorHandler";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import Item, { ButtonItem, ItemContent, ListItem } from "./Item";

export type OnItemClick = (
	value: string | ListItem,
	e: MouseEventHandler<HTMLDivElement> | KeyboardEvent,
	idx: number,
) => void;

interface ConfigProps {
	isOpen?: boolean;
	isCode?: boolean;
	isLoadingData?: boolean;
	hideScrollbar?: boolean;
	maxItems?: number;
	filteredWidth: number;
}

interface ItemsProps extends HTMLAttributes<HTMLDivElement>, ConfigProps {
	items: ItemContent[];
	setIsOpen: (v: boolean) => void;
	buttons?: ButtonItem[];
	value: string;
	searchRef?: MutableRefObject<SearchElement>;
	blurInInput: () => void;
	onItemClick?: OnItemClick;
	keepFullWidth?: boolean;
}

const StyleDiv = styled.div<ConfigProps>`
	z-index: 1;
	width: 100%;
	border-radius: var(--radius-normal);
	box-shadow: var(--shadows-deeplight);
	background: var(--color-code-copy-bg);
	${(p) => (p.isCode ? "" : "left: 5.5px;")}
	${(p) => `max-width: ${p.filteredWidth ?? 0}px;`}
	${(p) => (p.isOpen ? `max-height: ${p.maxItems * 32}px;` : "height: 0px;")}
	overflow-y: ${(p) => (p.hideScrollbar ? "hidden" : "auto")};
	overflow-x: hidden;

	.disable-with-tooltip {
		pointer-events: all !important;
		cursor: default;
	}
`;

const getArray = <T,>(array: T[]): T[] => (!Array.isArray(array) || !array.length ? [] : array);

const RequestValueNotFound = ({ value }: { value: string }) => (
	<Item
		style={{ display: "flex", justifyContent: "left" }}
		content={{
			element: (
				<span style={{ fontSize: "14px", padding: "6px 12px" }}>
					По запросу <strong>&quot;{value}&quot;</strong> совпадений не найдено.
				</span>
			),
			labelField: "",
		}}
	/>
);

interface StyledVirtuosoProps {
	height: number;
	width: number;
	children: ReactNode;
	className?: string;
	keepFullWidth: boolean;
}

const StyledVirtuoso = styled(({ children, className }: StyledVirtuosoProps) => {
	return <div className={className}>{children}</div>;
})`
	height: ${(p) => p.height}px;
	${(p) =>
		p.keepFullWidth &&
		`
	[data-testid="virtuoso-scroller"] {
		overflow-x: hidden;
	}
	[data-viewport-type="element"] {
		width: ${p.width}px !important;
	}`}
`;

const Items = (props: ItemsProps) => {
	const {
		items,
		buttons,
		onItemClick,
		isOpen,
		setIsOpen,
		blurInInput,
		searchRef,
		className,
		value,
		maxItems = 6,
		isLoadingData,
		keepFullWidth,
		...otherProps
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const focusRef = useRef<HTMLDivElement>(null);

	const [activeIdx, setActiveIdx] = useState<number>(0);

	const itemsWithButtons = useMemo(() => {
		return [...getArray(buttons), ...getArray(items)];
	}, [buttons, items]);
	const useVirtuoso = itemsWithButtons.length > maxItems;
	const virtuosoRef = useRef<VirtuosoHandle>(null);

	const moveActiveIdx = useCallback(
		(n: number) => {
			const isNextLarger = n > 0;
			setActiveIdx((prevActiveIdx) => {
				let newIndex = prevActiveIdx + n;
				if (newIndex < 0) newIndex = 0;
				else if (newIndex >= itemsWithButtons.length) newIndex = itemsWithButtons.length - 1;
				const newViewIndex = newIndex;
				while ((itemsWithButtons[newIndex] as ListItem)?.isTitle) {
					if (newIndex === 0 || newIndex === itemsWithButtons.length - 1)
						!isNextLarger ? newIndex++ : newIndex--;
					else isNextLarger ? newIndex++ : newIndex--;
				}
				virtuosoRef.current?.scrollIntoView({
					index: newIndex === prevActiveIdx ? newViewIndex : newIndex,
					behavior: "auto",
				});
				return newIndex;
			});
		},
		[itemsWithButtons.length],
	);

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
		const menuItems = ref?.current?.children;
		for (let i = 0; i < menuItems.length; i++) {
			const item = menuItems[i] as HTMLElement;
			if (item.contains(e.target as Node)) {
				setActiveIdx(+(item.dataset.index ?? i));
				break;
			}
		}
	}, []);

	const itemClickHandler = useCallback(
		({ item, e, idx }) => {
			onItemClick(item, e, idx);
		},
		[onItemClick],
	);

	const keydownHandler = useCallback(
		(e: KeyboardEvent) => {
			const action = {
				PageDown: () => moveActiveIdx(maxItems),
				PageUp: () => moveActiveIdx(-maxItems),
				ArrowUp: () => moveActiveIdx(-1),
				ArrowDown: () => moveActiveIdx(1),
				Enter: () => focusRef.current.click(),
				Escape: () => {
					blurInInput();
					setIsOpen(false);
				},
			}[e.key];

			if (action) {
				e.preventDefault();
				action();
			}
		},
		[moveActiveIdx, onItemClick, items, activeIdx, maxItems, blurInInput],
	);

	useEffect(() => {
		moveActiveIdx(-activeIdx);
	}, [buttons, items]);

	useEffect(() => {
		const inputRef = searchRef?.current?.inputRef;
		inputRef?.addEventListener("keydown", keydownHandler);

		return () => inputRef?.removeEventListener("keydown", keydownHandler);
	}, [keydownHandler, searchRef]);

	const itemContent = (idx) => {
		const button = buttons[idx];
		const isLastButton = !(buttons.length - 1 - idx);

		if (idx < buttons.length) {
			return (
				<Item
					key={idx}
					content={parseButton({ ...button, isLastButton })}
					onClick={() => {
						setIsOpen(false);
						blurInInput();
						return button.onClick();
					}}
					ref={idx === activeIdx ? focusRef : null}
					isActive={idx === activeIdx}
					disable={typeof button === "string" ? null : button?.disable}
				/>
			);
		}

		const itemIndex = idx - buttons.length;
		const item = items[itemIndex];

		const tooltipDisabledContent =
			typeof item !== "string" && item.disable ? item.tooltipDisabledContent : undefined;

		return (
			<Tooltip content={tooltipDisabledContent} key={idx}>
				<Item
					key={idx}
					className={classNames("", {
						"disable-with-tooltip": !!tooltipDisabledContent,
					})}
					content={item}
					onClick={(e) => {
						itemClickHandler({ item, e, idx: itemIndex });
						setIsOpen(false);
						blurInInput();
					}}
					ref={idx === activeIdx ? focusRef : null}
					isActive={(typeof item === "string" || !item.isTitle) && idx === activeIdx}
					disable={typeof item === "string" ? null : item?.disable}
				/>
			</Tooltip>
		);
	};

	return (
		<StyleDiv
			ref={!useVirtuoso ? ref : null}
			maxItems={maxItems}
			onMouseMove={handleMouseMove}
			className={classNames("items", {}, [className])}
			isOpen={isOpen}
			{...otherProps}
		>
			{!useVirtuoso ? (
				itemsWithButtons.map((_, idx) => itemContent(idx))
			) : (
				<StyledVirtuoso height={maxItems * 32} width={otherProps.filteredWidth} keepFullWidth={keepFullWidth}>
					<ErrorHandler>
						<Virtuoso
							ref={virtuosoRef}
							totalCount={itemsWithButtons.length}
							components={{
								List: forwardRef(({ children, ...props }, listRef) => {
									return (
										<div
											ref={(el) => {
												if (typeof listRef === "function") {
													listRef(el);
												} else if (listRef) {
													listRef.current = el;
												}
												ref.current = el;
											}}
											{...props}
										>
											{children}
										</div>
									);
								}),
							}}
							itemContent={itemContent}
						/>
					</ErrorHandler>
				</StyledVirtuoso>
			)}
			{!getArray(items).length && (
				<>
					{isLoadingData && <Item content={LoadingListItem} />}
					{value && !isLoadingData && <RequestValueNotFound value={value} />}
				</>
			)}
		</StyleDiv>
	);
};

export default Items;
