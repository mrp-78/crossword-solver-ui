import {getBackendServer} from "common/utils";

const backendUrl = getBackendServer();

export const getDemoCrosswordsUrl      = ()               => `${backendUrl}/api/v1/demo/crossword`;
export const getDemoCrosswordByIdUrl   = (id: string)     => `${backendUrl}/api/v1/demo/crossword/${id}`;
