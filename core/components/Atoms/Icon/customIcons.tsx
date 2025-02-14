import { HTMLAttributes } from "react";

export type CustomIcon = (props: HTMLAttributes<SVGElement>) => JSX.Element;

const customIcons: { [K: string]: CustomIcon } = {
	"confluence cloud": (props) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 255.376 245.387">
				<defs>
					<linearGradient
						id="a"
						x1="171.694"
						x2="58.638"
						y1="368.874"
						y2="239.067"
						gradientTransform="scale(1.41354 .70744)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="18%" stopColor="#0052CC" />
						<stop offset="100%" stopColor="#2684FF" />
					</linearGradient>
					<linearGradient
						id="b"
						x1="8.972"
						x2="122.094"
						y1="-21.812"
						y2="108.01"
						gradientTransform="scale(1.41309 .70767)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="18%" stopColor="#0052CC" />
						<stop offset="100%" stopColor="#2684FF" />
					</linearGradient>
				</defs>
				<path
					fill="url(#a)"
					d="M9.26 187.33c-2.64 4.307-5.607 9.305-8.126 13.287a8.127 8.127 0 0 0 2.722 11.052l52.823 32.507a8.127 8.127 0 0 0 11.256-2.763c2.113-3.536 4.835-8.127 7.801-13.044 20.926-34.538 41.974-30.312 79.925-12.19l52.376 24.908a8.127 8.127 0 0 0 10.93-4.063l25.152-56.886a8.127 8.127 0 0 0-4.063-10.646c-11.052-5.201-33.034-15.562-52.823-25.111-71.189-34.579-131.691-32.344-177.972 42.949z"
				/>
				<path
					fill="url(#b)"
					d="M246.115 58.232c2.641-4.307 5.607-9.305 8.127-13.287a8.127 8.127 0 0 0-2.723-11.052L198.696 1.386a8.127 8.127 0 0 0-11.58 2.682c-2.113 3.535-4.835 8.127-7.802 13.043-20.926 34.538-41.974 30.313-79.925 12.19L47.176 4.515a8.127 8.127 0 0 0-10.93 4.063L11.093 65.465a8.127 8.127 0 0 0 4.063 10.645c11.052 5.202 33.035 15.563 52.823 25.112 71.351 34.538 131.854 32.222 178.135-42.99z"
				/>
			</svg>
		);
	},
	"confluence self-hosted server": (props) => customIcons["confluence cloud"](props),
	notion: (props) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 32 32" fill="none">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M5.716 29.2178L2.27664 24.9331C1.44913 23.9023 1 22.6346 1 21.3299V5.81499C1 3.86064 2.56359 2.23897 4.58071 2.10125L20.5321 1.01218C21.691 0.933062 22.8428 1.24109 23.7948 1.8847L29.3992 5.67391C30.4025 6.35219 31 7.46099 31 8.64426V26.2832C31 28.1958 29.4626 29.7793 27.4876 29.9009L9.78333 30.9907C8.20733 31.0877 6.68399 30.4237 5.716 29.2178Z"
					fill="white"
				/>
				<path
					d="M11.2481 13.5787V13.3756C11.2481 12.8607 11.6605 12.4337 12.192 12.3982L16.0633 12.1397L21.417 20.0235V13.1041L20.039 12.9204V12.824C20.039 12.303 20.4608 11.8732 20.9991 11.8456L24.5216 11.6652V12.1721C24.5216 12.41 24.3446 12.6136 24.1021 12.6546L23.2544 12.798V24.0037L22.1906 24.3695C21.3018 24.6752 20.3124 24.348 19.8036 23.5803L14.6061 15.7372V23.223L16.2058 23.5291L16.1836 23.6775C16.1137 24.1423 15.7124 24.4939 15.227 24.5155L11.2481 24.6926C11.1955 24.1927 11.5701 23.7456 12.0869 23.6913L12.6103 23.6363V13.6552L11.2481 13.5787Z"
					fill="#000000"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M20.6749 2.96678L4.72347 4.05585C3.76799 4.12109 3.02734 4.88925 3.02734 5.81499V21.3299C3.02734 22.1997 3.32676 23.0448 3.87843 23.7321L7.3178 28.0167C7.87388 28.7094 8.74899 29.0909 9.65435 29.0352L27.3586 27.9454C28.266 27.8895 28.9724 27.1619 28.9724 26.2832V8.64426C28.9724 8.10059 28.6979 7.59115 28.2369 7.27951L22.6325 3.49029C22.0613 3.10413 21.3702 2.91931 20.6749 2.96678ZM5.51447 6.057C5.29261 5.89274 5.3982 5.55055 5.6769 5.53056L20.7822 4.44711C21.2635 4.41259 21.7417 4.54512 22.1309 4.82088L25.1617 6.96813C25.2767 7.04965 25.2228 7.22563 25.0803 7.23338L9.08387 8.10336C8.59977 8.12969 8.12193 7.98747 7.73701 7.7025L5.51447 6.057ZM8.33357 10.8307C8.33357 10.311 8.75341 9.88177 9.29027 9.85253L26.203 8.93145C26.7263 8.90296 27.1667 9.30534 27.1667 9.81182V25.0853C27.1667 25.604 26.7484 26.0328 26.2126 26.0633L9.40688 27.0195C8.8246 27.0527 8.33357 26.6052 8.33357 26.0415V10.8307Z"
					fill="#000000"
				/>
			</svg>
		);
	},
	gramax: (props) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 30 30" fill="none">
				<g clipPath="url(#clip0_874_2563)">
					<rect width="30" height="30" fill="#121315" />
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M10.4297 23.4462C11.0824 23.7019 11.9016 23.8298 12.8871 23.8298C13.9494 23.8298 14.8517 23.6572 15.594 23.3119C16.3363 22.9666 16.9059 22.4614 17.3026 21.7964C17.6994 21.1314 17.8978 20.3129 17.8978 19.341V10.1139C17.8978 9.98603 17.8466 9.87732 17.7442 9.7878C17.6546 9.68549 17.5394 9.63434 17.3986 9.63434H15.1908C15.05 9.63434 14.9349 9.68549 14.8453 9.7878C14.7557 9.87732 14.7109 9.98603 14.7109 10.1139V10.8237C14.3909 10.4272 13.9813 10.1011 13.4822 9.84535C12.9958 9.57679 12.4071 9.4425 11.716 9.4425C11.0632 9.4425 10.4873 9.55121 9.98815 9.76862C9.489 9.97324 9.06664 10.2738 8.72108 10.6702C8.38831 11.0667 8.13234 11.5399 7.95315 12.0898C7.77397 12.6397 7.66518 13.2599 7.62679 13.9505C7.61399 14.283 7.61399 14.6155 7.62679 14.948C7.66518 15.6642 7.77397 16.2973 7.95315 16.8472C8.14513 17.3971 8.40751 17.8639 8.74027 18.2475C9.07304 18.6312 9.489 18.9189 9.98815 19.1108C10.4873 19.3026 11.0632 19.3985 11.716 19.3985C12.3687 19.3985 12.9255 19.3026 13.3862 19.1108C13.847 18.9062 14.2245 18.644 14.5189 18.3243V19.6095C14.5189 20.0699 14.4549 20.4344 14.3269 20.703C14.1989 20.9843 14.0069 21.1826 13.751 21.2977C13.495 21.4255 13.175 21.4895 12.7911 21.4895C12.4455 21.4895 12.1703 21.4383 11.9656 21.336C11.7736 21.2465 11.62 21.125 11.5048 20.9715C11.4024 20.8181 11.3192 20.671 11.2552 20.5303C11.204 20.3896 11.1336 20.2873 11.044 20.2234C10.9673 20.1722 10.8713 20.1467 10.7561 20.1467H8.31792C8.17713 20.1467 8.05554 20.1914 7.95315 20.2809C7.85076 20.3705 7.80597 20.4856 7.81877 20.6262C7.83157 20.8309 7.92116 21.1058 8.08754 21.4511C8.25392 21.8092 8.5227 22.1673 8.89386 22.5254C9.27782 22.8835 9.78977 23.1904 10.4297 23.4462ZM13.751 16.6362C13.495 16.8152 13.1622 16.9047 12.7527 16.9047C12.3303 16.9047 11.9911 16.8152 11.7352 16.6362C11.492 16.4571 11.3128 16.2141 11.1976 15.9072C11.0952 15.6003 11.0312 15.2614 11.0056 14.8905C10.9928 14.5964 10.9928 14.3086 11.0056 14.0273C11.0312 13.6564 11.0952 13.3175 11.1976 13.0106C11.3128 12.7036 11.492 12.4606 11.7352 12.2816C11.9911 12.1026 12.3303 12.013 12.7527 12.013C13.1622 12.013 13.495 12.1026 13.751 12.2816C14.0069 12.4479 14.1925 12.6717 14.3077 12.953C14.4357 13.2344 14.5061 13.5413 14.5189 13.8738C14.5317 14.0017 14.5381 14.1935 14.5381 14.4493C14.5381 14.7051 14.5317 14.9033 14.5189 15.044C14.5061 15.3637 14.4357 15.6642 14.3077 15.9456C14.1925 16.2269 14.0069 16.4571 13.751 16.6362Z"
						fill="white"
					/>
					<path
						d="M19.8705 5.80779H18.1758V4.84863H22.5245V5.80779H20.8297V24.1922H22.5245V25.1514H18.1758V24.1922H19.8705V5.80779Z"
						fill="#E9EBEF"
					/>
				</g>
				<defs>
					<clipPath id="clip0_874_2563">
						<rect width="30" height="30" rx="5" fill="white" />
					</clipPath>
				</defs>
			</svg>
		);
	},
	git: (props) => {
		return (
			<svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path d="M11.9912 8.32959L11.992 15.6298" strokeLinecap="square" />
				<path d="M13.2529 7.78076L16.2069 10.7347" strokeLinecap="square" />
				<path d="M9.08301 3.60596L10.8275 5.35047" strokeLinecap="square" />
				<path d="M13.559 6.60811C13.559 7.47224 12.8585 8.17275 11.9943 8.17275C11.1302 8.17275 10.4297 7.47224 10.4297 6.60811C10.4297 5.74397 11.1302 5.04346 11.9943 5.04346C12.8585 5.04346 13.559 5.74397 13.559 6.60811Z" />
				<path d="M18.9428 11.9714C18.9428 12.8355 18.2423 13.536 17.3781 13.536C16.514 13.536 15.8135 12.8355 15.8135 11.9714C15.8135 11.1073 16.514 10.4067 17.3781 10.4067C18.2423 10.4067 18.9428 11.1073 18.9428 11.9714Z" />
				<path d="M13.5629 17.3864C13.5629 18.2506 12.8624 18.9511 11.9983 18.9511C11.1341 18.9511 10.4336 18.2506 10.4336 17.3864C10.4336 16.5223 11.1341 15.8218 11.9983 15.8218C12.8624 15.8218 13.5629 16.5223 13.5629 17.3864Z" />
				<path d="M1.38175 11.0784L11.0784 1.38175C11.5874 0.872751 12.4127 0.872749 12.9217 1.38175L22.6184 11.0784C23.1273 11.5874 23.1273 12.4127 22.6184 12.9217L12.9217 22.6183C12.4127 23.1272 11.5874 23.1272 11.0784 22.6183L1.38175 12.9217C0.87275 12.4127 0.87275 11.5874 1.38175 11.0784Z" />
			</svg>
		);
	},
	"yandex.disk": (props) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="2 0 41 41" fill="none">
				<g filter="url(#a)">
					<g clipPath="url(#b)">
						<rect fill="url(#c)" rx="10" />
						<path
							fill="#0012B5"
							d="M30.113 11.66c-1.152-.019-1.994-.298-2.892-.596a39 39 0 0 0-.568-.186c-2.483-.783-5.557-.739-8.372.58a11.5 11.5 0 0 0-5.303 5.067c-.202.389-.397.795-.591 1.2-.525 1.095-1.048 2.186-1.729 2.942-3.25 3.33-4.727 6.78-3.674 8.965 2.269 4.713 34.983-10.61 32.714-15.324-.89-1.845-4.709-2.975-9.585-2.647z"
						/>
						<path
							fill="#1884FF"
							fillRule="evenodd"
							d="M27.055 29.482c9.072-4.249 14.485-11.722 13.013-14.778s-10.313-2.51-19.384 1.74S5.749 27.034 7.22 30.091c1.472 3.056 10.765 3.64 19.835-.609"
							clipRule="evenodd"
						/>
						<g filter="url(#d)">
							<path
								fill="#fff"
								fillRule="evenodd"
								d="M26.832 28.116c4.29-2.01 7.204-4.81 6.508-6.257-.696-1.445-4.738-.988-9.029 1.022s-7.204 4.81-6.508 6.256c.696 1.445 4.738.989 9.029-1.021"
								clipRule="evenodd"
							/>
						</g>
					</g>
				</g>
			</svg>
		);
	},
	approved: () => {
		return (
			<svg
				width="18.7"
				height="18.7"
				viewBox="0 0 18.7 18.7"
				stroke="#24663bde"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="9" cy="9" r="8.5" stroke="none" fill="#C3E6CD" />
				<circle cx="9" cy="9" r="8" stroke="#24663B" strokeOpacity="0.1" />
				<path
					d="M12.6001 6.29993L7.65015 11.2499L5.40015 8.99993"
					stroke="#24663B"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	},
	unapproved: () => {
		return (
			<svg width="18.7" height="18.7" viewBox="0 0 18.7 18.7" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="9" cy="9" r="8.5" stroke="#6b6b6b" strokeOpacity="0.8" strokeDasharray="2 2" />
				<circle cx="9" cy="9" r="8" fill="#d2d1d133" strokeOpacity="0" />
			</svg>
		);
	},
	"git-merge2": () => {
		return (
			<svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M0 0.875C0 0.6875 0.164062 0.5 0.375 0.5H2.25H3.35156C3.72656 0.5 4.05469 0.6875 4.26562 0.96875L6.82031 4.48438C6.89062 4.57812 7.00781 4.625 7.125 4.625H10.7109L9.46875 3.40625C9.32812 3.26562 9.32812 3.00781 9.46875 2.86719C9.60938 2.72656 9.86719 2.72656 10.0078 2.86719L11.8828 4.74219C12.0234 4.88281 12.0234 5.14062 11.8828 5.28125L10.0078 7.15625C9.86719 7.29688 9.60938 7.29688 9.46875 7.15625C9.32812 7.01562 9.32812 6.75781 9.46875 6.61719L10.7109 5.375H7.125C7.00781 5.375 6.89062 5.44531 6.82031 5.53906L4.26562 9.05469C4.05469 9.33594 3.72656 9.5 3.35156 9.5H2.25H0.375C0.164062 9.5 0 9.33594 0 9.125C0 8.9375 0.164062 8.75 0.375 8.75H2.25H3.35156C3.46875 8.75 3.58594 8.70312 3.65625 8.60938L6.21094 5.09375C6.23438 5.07031 6.25781 5.04688 6.28125 5C6.25781 4.97656 6.23438 4.95312 6.21094 4.92969L3.65625 1.41406C3.58594 1.32031 3.46875 1.25 3.35156 1.25H2.25H0.375C0.164062 1.25 0 1.08594 0 0.875Z"
					strokeWidth={0.7}
					fill="var(--color-btn-stroke)"
				/>
			</svg>
		);
	},
	"delete-row": () => {
		return (
			<svg
				data-qa="table-del-row"
				width="1em"
				height="1em"
				viewBox="-1.5 -1.5 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0.954594 0.696743C0.778858 0.521007 0.493934 0.521007 0.318198 0.696743C0.142462 0.872479 0.142462 1.1574 0.318198 1.33314L2.9032 3.91814H1C0.447715 3.91814 0 4.36585 0 4.91814V7.71814C0 8.27042 0.447715 8.71814 1 8.71814H7.7032L10.2884 11.3033C10.4641 11.4791 10.7491 11.4791 10.9248 11.3033C11.1005 11.1276 11.1005 10.8427 10.9248 10.6669L0.954594 0.696743ZM6.8032 7.81814L3.8032 4.81814H1C0.944771 4.81814 0.9 4.86291 0.9 4.91814V7.71814C0.9 7.77337 0.944772 7.81814 1 7.81814H6.8032Z"
					fill="currentColor"
				/>
				<path
					d="M11 7.81814H9.31745L10.2174 8.71814H11C11.5523 8.71814 12 8.27042 12 7.71814V4.91814C12 4.36585 11.5523 3.91814 11 3.91814H5.41745L6.31745 4.81814H11C11.0552 4.81814 11.1 4.86291 11.1 4.91814V7.71814C11.1 7.77337 11.0552 7.81814 11 7.81814Z"
					fill="currentColor"
				/>
			</svg>
		);
	},
	"delete-column": () => {
		return (
			<svg width="1em" height="1em" viewBox="-1.25 -1.5 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M8.7784 9.09663V11C8.7784 11.5523 8.33068 12 7.7784 12H4.9784C4.42611 12 3.9784 11.5523 3.9784 11V4.29663L0.696743 1.01498C0.521007 0.839239 0.521007 0.554315 0.696743 0.378579C0.872479 0.202843 1.1574 0.202843 1.33314 0.378579L11.3033 10.3488C11.4791 10.5245 11.4791 10.8094 11.3033 10.9852C11.1276 11.1609 10.8427 11.1609 10.6669 10.9852L8.7784 9.09663ZM7.8784 8.19663V11C7.8784 11.0552 7.83363 11.1 7.7784 11.1H4.9784C4.92317 11.1 4.8784 11.0552 4.8784 11L4.8784 5.19663L7.8784 8.19663Z"
					fill="currentColor"
				/>
				<path
					d="M8.7784 6.58243L7.8784 5.68243L7.8784 1C7.8784 0.944771 7.83363 0.9 7.7784 0.9L4.9784 0.9C4.92317 0.9 4.8784 0.944771 4.8784 1V2.68243L3.9784 1.78243V1C3.9784 0.447715 4.42611 0 4.9784 0H7.7784C8.33068 0 8.7784 0.447715 8.7784 1L8.7784 6.58243Z"
					fill="currentColor"
				/>
			</svg>
		);
	},
	"merge-cells": () => {
		return (
			<svg width="1em" height="1em" viewBox="-1.5 -1.5 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.42456 10.35H4.22456C4.27979 10.35 4.32456 10.3052 4.32456 10.25V9.5H5.22456V10.25C5.22456 10.8023 4.77685 11.25 4.22456 11.25H1.42456C0.872275 11.25 0.424561 10.8023 0.424561 10.25V1.75C0.424561 1.19772 0.872276 0.75 1.42456 0.75H4.22456C4.77685 0.75 5.22456 1.19772 5.22456 1.75V2.5H4.32456V1.75C4.32456 1.69477 4.27979 1.65 4.22456 1.65L1.42456 1.65C1.36933 1.65 1.32456 1.69477 1.32456 1.75L1.32456 5.55237H2.57637L2.56242 3.75121C2.56242 3.67966 2.64527 3.64011 2.69988 3.68342L5.5432 5.93361C5.58651 5.9675 5.58651 6.0334 5.5432 6.0673L2.69988 8.3156C2.64339 8.36079 2.56242 8.31936 2.56242 8.24781V6.44526H1.32456L1.32456 10.25C1.32456 10.3052 1.36933 10.35 1.42456 10.35Z"
					fill="currentColor"
				/>
				<path
					d="M7.77544 1.65L10.5754 1.65C10.6307 1.65 10.6754 1.69477 10.6754 1.75V5.55474H9.43758V3.75219C9.43758 3.68064 9.35661 3.63921 9.30012 3.6844L6.4568 5.9327C6.41349 5.9666 6.41349 6.0325 6.4568 6.06639L9.30012 8.31658C9.35473 8.35989 9.43758 8.32034 9.43758 8.24879L9.42363 6.44763H10.6754V10.25C10.6754 10.3052 10.6307 10.35 10.5754 10.35H7.77544C7.72021 10.35 7.67544 10.3052 7.67544 10.25V9.5H6.77544V10.25C6.77544 10.8023 7.22315 11.25 7.77544 11.25H10.5754C11.1277 11.25 11.5754 10.8023 11.5754 10.25L11.5754 1.75C11.5754 1.19772 11.1277 0.75 10.5754 0.75L7.77544 0.75C7.22315 0.75 6.77544 1.19772 6.77544 1.75V2.5L7.67544 2.5V1.75C7.67544 1.69477 7.72021 1.65 7.77544 1.65Z"
					fill="currentColor"
				/>
			</svg>
		);
	},
	"split-cells": () => {
		return (
			<svg width="1em" height="1em" viewBox="-1 -1.5 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M7.84888 10.35H10.6489C10.7041 10.35 10.7489 10.3052 10.7489 10.25V9.5H11.6489V10.25C11.6489 10.8023 11.2012 11.25 10.6489 11.25H7.84888C7.29659 11.25 6.84888 10.8023 6.84888 10.25V1.75C6.84888 1.19772 7.29659 0.75 7.84888 0.75H10.6489C11.2012 0.75 11.6489 1.19772 11.6489 1.75V2.5H10.7489V1.75C10.7489 1.69477 10.7041 1.65 10.6489 1.65L7.84888 1.65C7.79365 1.65 7.74888 1.69477 7.74888 1.75V5.55237H9.00068L8.98673 3.75121C8.98673 3.67966 9.06958 3.64011 9.12419 3.68342L11.9675 5.93361C12.0108 5.9675 12.0108 6.0334 11.9675 6.0673L9.12419 8.3156C9.0677 8.36079 8.98673 8.31936 8.98673 8.24781V6.44526H7.74888L7.74888 10.25C7.74888 10.3052 7.79365 10.35 7.84888 10.35Z"
					fill="currentColor"
				/>
				<path
					d="M1.35112 1.65L4.15112 1.65C4.20635 1.65 4.25112 1.69477 4.25112 1.75L4.25112 5.55462H3.01327L3.01327 3.75207C3.01327 3.68051 2.9323 3.63909 2.87581 3.68428L0.0324817 5.93258C-0.0108272 5.96647 -0.0108272 6.03238 0.0324817 6.06627L2.87581 8.31645C2.93042 8.35976 3.01327 8.32022 3.01327 8.24867L2.99932 6.44751H4.25112V10.25C4.25112 10.3052 4.20635 10.35 4.15112 10.35H1.35112C1.29589 10.35 1.25112 10.3052 1.25112 10.25V9.5H0.351123L0.351123 10.25C0.351123 10.8023 0.798838 11.25 1.35112 11.25H4.15112C4.70341 11.25 5.15112 10.8023 5.15112 10.25L5.15112 1.75C5.15112 1.19772 4.70341 0.75 4.15112 0.75L1.35112 0.75C0.798838 0.75 0.351122 1.19772 0.351122 1.75L0.351122 2.5L1.25112 2.5L1.25112 1.75C1.25112 1.69477 1.29589 1.65 1.35112 1.65Z"
					fill="currentColor"
				/>
			</svg>
		);
	},
	"row-title": () => {
		return (
			<svg width="1rem" height="1rem" viewBox="-1.5 -1.5 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 10.25C12 10.8023 11.5523 11.25 11 11.25H1C0.447715 11.25 0 10.8023 0 10.25V1.75C0 1.68096 0.00699555 1.61356 0.0203164 1.54847C0.0402978 1.45082 0.0745112 1.35836 0.120695 1.27334C0.198134 1.13079 0.309229 1.00917 0.443314 0.919152C0.602438 0.812325 0.793941 0.75 1 0.75H11C11.5523 0.75 12 1.19772 12 1.75V10.25ZM5.55 4.55V10.35H1C0.944772 10.35 0.9 10.3052 0.9 10.25V4.55H5.55ZM6.45 4.55V10.35H11C11.0552 10.35 11.1 10.3052 11.1 10.25V4.55H6.45Z"
					fill="currentColor"
				/>
			</svg>
		);
	},
	"column-title": () => {
		return (
			<svg width="1rem" height="1rem" viewBox="-1.5 -1.5 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M11 0.75C11.5523 0.75 12 1.19772 12 1.75V10.25C12 10.8023 11.5523 11.25 11 11.25L1 11.25C0.447715 11.25 0 10.8023 0 10.25V1.75C0 1.19771 0.447715 0.75 0.999999 0.75H11ZM3.8 6.45L11.1 6.45V10.25C11.1 10.3052 11.0552 10.35 11 10.35L3.8 10.35L3.8 6.45ZM3.8 5.55L11.1 5.55V1.75C11.1 1.69477 11.0552 1.65 11 1.65L3.8 1.65L3.8 5.55Z"
					fill="currentColor"
				/>
			</svg>
		);
	},
	"custom-cloud-up": () => {
		return (
			<svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
				<path d="M389.8 125.2C363.7 88.1 320.7 64 272 64c-77.4 0-140.5 61-143.9 137.5c-.6 13-9 24.4-21.3 28.8C63.2 245.7 32 287.2 32 336c0 61.9 50.1 112 112 112l368 0c53 0 96-43 96-96c0-36.8-20.7-68.8-51.2-84.9c-13.4-7.1-20-22.5-15.8-37.1c2-6.9 3-14.3 3-22c0-44.2-35.8-80-80-80c-12.3 0-23.9 2.8-34.3 7.7c-14.1 6.7-30.9 2.3-39.9-10.5zM272 32c59.5 0 112.1 29.5 144 74.8C430.5 99.9 446.8 96 464 96c61.9 0 112 50.1 112 112c0 10.7-1.5 21-4.3 30.8C612.3 260.2 640 302.9 640 352c0 70.7-57.3 128-128 128l-368 0C64.5 480 0 415.5 0 336c0-62.8 40.2-116.1 96.2-135.9C100.3 106.6 177.4 32 272 32zM228.7 244.7l80-80c6.2-6.2 16.4-6.2 22.6 0l80 80c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L336 214.6 336 368c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-153.4-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6z" />
			</svg>
		);
	},
	"crossed-cloud": () => {
		return (
			<svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
				<path d="M25.9 3.4C19-2 8.9-.8 3.4 6.1S-.8 23.1 6.1 28.6l608 480c6.9 5.5 17 4.3 22.5-2.6s4.3-17-2.6-22.5L25.9 3.4zM640 352c0-49.1-27.7-91.8-68.3-113.2c2.8-9.8 4.3-20.1 4.3-30.8c0-61.9-50.1-112-112-112c-17.2 0-33.5 3.9-48 10.8C384.1 61.5 331.5 32 272 32c-35.5 0-68.6 10.5-96.2 28.6l26.8 21.2C223.2 70.5 246.8 64 272 64c48.7 0 91.7 24.1 117.8 61.2c9 12.7 25.8 17.2 39.9 10.5c10.3-4.9 21.9-7.7 34.3-7.7c44.2 0 80 35.8 80 80c0 7.7-1.1 15-3 22c-4.1 14.5 2.5 30 15.8 37.1C587.3 283.2 608 315.2 608 352c0 15.1-3.5 29.4-9.7 42.2l25.6 20.2C634.1 395.9 640 374.6 640 352zM101.3 164.9c-2.9 11.3-4.6 23.1-5.1 35.2C40.2 219.9 0 273.2 0 336c0 79.5 64.5 144 144 144l356.4 0-40.5-32L144 448C82.1 448 32 397.9 32 336c0-48.8 31.2-90.3 74.8-105.7c12.3-4.3 20.8-15.7 21.3-28.8c.2-4.9 .7-9.7 1.4-14.4l-28.2-22.2z" />
			</svg>
		);
	},
};
export default customIcons;
