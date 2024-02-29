const aliases = {
	главной: "/",
	навигацию: ".scrolling-content .tree-root",
	редактор: ".ProseMirror, article",
	публикация: '[data-qa="article-git-modal"]',
	"левую навигацию": ".left-navigation-layout .scrolling-content .tree-root",
	"левую панель": ".left-navigation-layout, .left-sidebar",
	"нижнюю панель": `[data-qa="qa-status-bar"]`,
	"правую панель": ".article-right-sidebar",
	"панель действий": '[data-qa="app-actions"]',
	"инлайновая панель": '[data-qa="qa-inline-wysiwyg-menu"]',
	"блок комментариев": ".comment-block",
	"история изменений": '[data-qa="article-git-modal"]',
	"окно добавления комментария": '[data-qa="qa-add-comment"]',
	"панель действий статьи": ".right-extensions",
	"объединение веток": ".picker",
	"верхнюю часть конфликта": ".top-part-conflict",
	"нижнюю часть конфликта": ".bottom-part-conflict",

	"%token%": process.env.GX_E2E_GITLAB_TOKEN,
	"%url%": process.env.GX_E2E_GITLAB_URL,
	"%group%": process.env.GX_E2E_GITLAB_GROUP,
	"%push-repo%": process.env.GX_E2E_GITLAB_PUSH_REPO,
	"%test-repo%": process.env.GX_E2E_GITLAB_TEST_REPO,

	"%next-login%": process.env.ADMIN_LOGIN,
	"%next-password%": process.env.ADMIN_PASSWORD,
} as Aliases;

const icons = {
	плюс: ".fa-plus",
	коммент: ".fa-comment-alt",
	"блок кода": ".fa-code",
	"нумерованный список": ".fa-list-ol",
	"маркированный список": ".fa-list-ul",
	"новый комментарий": ".fa-message",
	корзина: ".fa-trash",
	диаграммы: ".fa-diagram-project",
	"диаграмма draw.io": `[data-qa="qa-edit-menu-diagrams.net"]`,
	"диаграмма mermaid": `[data-qa="qa-edit-menu-Mermaid"]`,
	заметка: ".fa-note",
	"удалить форматирование": ".fa-text-slash",
	ножницы: ".fa-scissors",
	"три точки": ".fa-ellipsis-h",
	облачка: ".fa-cloud-arrow-up",
	"зачёркнутого облачка": ".fa-cloud-slash",
	отмена: ".fa-reply",
	лупы: ".fa-search",
};

export type Aliases = { [key: string]: string };

export const globalAlias = (val: string) => aliases[val];

export const globalIcon = (shorthand: string) => {
	const name = icons[shorthand];
	if (!name) throw new Error("Invalid icon: '" + shorthand + "', supported: " + JSON.stringify(Object.keys(icons)));
	return name;
};
