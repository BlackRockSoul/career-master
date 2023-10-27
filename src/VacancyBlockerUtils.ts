import { IBlockedVacancy } from './types';

export class VacancyBlockerUtils {
	public static getBlockedVacancies = (): IBlockedVacancy[] => {
		const possibleListString = localStorage.getItem('blockedVacancies');
		if (!possibleListString) return [];

		const possibleList = JSON.parse(possibleListString) as IBlockedVacancy[];
		if (!possibleList?.length) return [];

		return possibleList;
	};

	private static blockedVacancies = this.getBlockedVacancies();

	private static readonly removeBlockedVacancy = (vacancyId: IBlockedVacancy | null) => {
		if (!vacancyId) throw new Error('vacancy is null');

		this.blockedVacancies = this.blockedVacancies.filter((blockedVacancy) => blockedVacancy !== vacancyId);
		localStorage.setItem('blockedVacancies', JSON.stringify(this.blockedVacancies));
	};

	public static blockVacancy = (vacancyId: IBlockedVacancy | null): boolean => {
		if (!vacancyId) throw new Error('vacancyId is null');

		if (this.isAlreadyBlocked(vacancyId)) {
			this.removeBlockedVacancy(vacancyId);
			return false;
		}

		this.blockedVacancies.push(vacancyId);
		localStorage.setItem('blockedVacancies', JSON.stringify(this.blockedVacancies));

		return true;
	};

	public static isAlreadyBlocked = (vacancy: IBlockedVacancy | null): boolean => !vacancy || this.blockedVacancies.includes(vacancy);
}
