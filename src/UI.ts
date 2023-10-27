export class UI {
	public static setVacancyOpacity = (el: Element, toHidden = true): void => {
		const hel = el as HTMLElement;
		hel.classList.toggle('career-master__marked', toHidden);
	};

	public static getVacancyId = (el: Element): null | number => {
		const possibleLink = el.querySelector('div.vacancy-card__info  a.vacancy-card__title-link');
		if (!possibleLink || !('href' in possibleLink)) return null;

		const href = possibleLink.href as string;
		const possibleId = href.match(/vacancies\/(\d*)/)?.[1];
		if (!possibleId) return null;

		return +possibleId;
	};

	public static addMarkButton = (el: Element, action: (el: Element) => void): void => {
		const actionsRow = el.querySelector('div.vacancy-card__actions');
		if (!actionsRow) return;

		const btn = actionsRow.appendChild(this.MarkButton.cloneNode(true)) as HTMLButtonElement;
		btn.onclick = () => action(el);
	};

	private static MarkButton = ((): HTMLButtonElement => {
		const styles = document.createElement('style');
		styles.textContent = `
		div.career-master__marked {
			opacity: 40%;
		}
		button.career-master__mark-button {
	    width: 24px;
	    height: 24px;
	    border-radius: 100%;
	    border: 2px solid #929ca5;
	    background: transparent;
	    transition: background 0.2s;
		}
		button.career-master__mark-button:hover {
	    background: #ddffdd;
		}
		div.career-master__marked button.career-master__mark-button {
	    background: #c2fac2;
		}
		div.career-master__marked button.career-master__mark-button:hover {
	    background: lightgrey;
		}
		`;
		document.head.appendChild(styles);

		const btn = document.createElement('button');
		btn.classList.add('career-master__mark-button');
		btn.title = 'Mark as read';

		return btn;
	})();
}
