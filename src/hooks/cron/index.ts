import { ApiExtensionContext } from "@directus/shared/types";
import { RegisterFunctions } from "../../@types/directus";


export default function ({ schedule, }: RegisterFunctions, { database }: ApiExtensionContext) {
    // schedule('0 0 * * *', async () => {
    //     try {
    //         dump()
    //     } catch (error) { }
    // })
};


