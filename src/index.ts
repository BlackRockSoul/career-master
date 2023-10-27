import { VacancyBlockerUtils } from './VacancyBlockerUtils';
import { UI } from './UI';

const { isAlreadyBlocked, blockVacancy } = VacancyBlockerUtils;

const markVacancy = (el: Element) => {
	const isBlocked = blockVacancy(UI.getVacancyId(el));
	UI.setVacancyOpacity(el, isBlocked);
};

const main = async () => {
	const list = document.querySelectorAll('body > div.page-container > div > div > div.content-wrapper > div > div > div.section-group.section-group--gap-medium > div.transition-expand > div > div > div.section-group > div.section-box');
	if (!list?.length) {
		console.error('Vacancies not found');
		return;
	}

	list.forEach((el) => {
		UI.addMarkButton(el, markVacancy);

		if (!isAlreadyBlocked(UI.getVacancyId(el))) return;
		UI.setVacancyOpacity(el);
	});
};

void main();
