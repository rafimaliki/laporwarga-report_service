import { generateMockReports } from "../mock/generator";

export const reportsService = {
  list: () => {
    return generateMockReports(100);
  },
};
