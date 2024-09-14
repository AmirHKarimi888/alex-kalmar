import { pb } from "~/pocketbase";

export const usePagesStore = defineStore("pages", () => {
    const pages = ref<any[]>([]);
    const selectedPage = ref<any>({});

    const getAllPages = async () => {
        await pb.collection('categoryPages').getFullList({
            sort: '-created',
            filter: "showPage = " + "" + true + "" + ""
        })
        .then((data: any) => pages.value = data)
    }

    const getPage = (route: string) => {
        selectedPage.value = pages.value.find((page: any) => page?.pageRoute === route);
    }

    return { selectedPage, pages, getPage, getAllPages };
})