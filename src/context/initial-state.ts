import { fetchUser } from "@/src/hooks/fetch-local-storage-data"

const userInfo = fetchUser();

const initialState = {
    user: userInfo
}

export default initialState