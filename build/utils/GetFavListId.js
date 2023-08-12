import sql from "../db.js";
export const GetFavListId = async (userId) => {
    const favListid = await sql `SELECT id FROM favlist WHERE userid = ${userId}`;
    return favListid[0]?.id;
};
//# sourceMappingURL=GetFavListId.js.map