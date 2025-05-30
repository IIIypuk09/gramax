import type { FormSchema } from "@components/Form/Form";
import ItemInput from "@components/Form/InputItem";
import { Validate } from "@components/Form/ValidateObject";
import t, { hasTranslation } from "@ext/localization/locale/translate";
import { ReactNode } from "react";

interface FieldProps {
	scheme: FormSchema;
	translationKey: string;
	formTranslationKey: string;
	value?: string | string[] | boolean;
	tabIndex?: number;
	required?: boolean;
	description?: string;
	isFocused?: boolean;
	fieldDirection?: "row" | "column";
	validate?: Validate;
	actionButtons?: ReactNode;
	input?: ReactNode;
	isLoading?: boolean;
	onFocus?: () => void;
	onChange?: (v: string | string[]) => void;
}

const Field = (props: FieldProps) => {
	const { required = false, isFocused = false, fieldDirection = "row", actionButtons, isLoading = false } = props;
	const { description, scheme, value, tabIndex, validate, input, formTranslationKey, translationKey } = props;
	const { onChange, onFocus } = props;

	const isCheckbox = scheme?.type == "boolean";

	if (typeof scheme === "string") {
		if (scheme === "separator") return <div className="separator" />;
		return <h3>{scheme}</h3>;
	}

	const translatedName = t(`forms.${formTranslationKey}.props.${translationKey}.name`);

	return (
		<div className="form-group">
			<div className={`field field-string ${fieldDirection}`}>
				{!isCheckbox && (
					<label className="control-label">
						<div style={{ display: "flex" }}>
							<span
								dangerouslySetInnerHTML={{
									__html: translatedName,
								}}
							/>
							{required && <span className="required">*</span>}
						</div>
						{actionButtons && <div className="actions">{actionButtons}</div>}
					</label>
				)}
				<div className={`input-lable ${isCheckbox ? "fill-width" : ""}`}>
					{input ? (
						input
					) : (
						<ItemInput
							dataQa={translatedName}
							scheme={scheme}
							tabIndex={tabIndex}
							focus={tabIndex == 1}
							validate={validate}
							translationKey={translationKey}
							formTranslationKey={formTranslationKey}
							showErrorText={isFocused}
							value={value}
							onChange={onChange}
							onFocus={onFocus}
							isLoading={isLoading}
						/>
					)}
				</div>
			</div>
			{(description || hasTranslation(`forms.${formTranslationKey}.props.${translationKey}.description`)) && (
				<div className={`input-lable-description ${isCheckbox ? "full-width" : ""}`}>
					{!isCheckbox && fieldDirection === "row" && <div />}
					<div
						className="article"
						dangerouslySetInnerHTML={{
							__html: description || t(`forms.${formTranslationKey}.props.${translationKey}.description`),
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default Field;
