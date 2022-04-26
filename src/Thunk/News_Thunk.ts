import {AppThunk} from "../redax/store";
import {NewsAPI} from "../Api/NewsAPI";
import {getNewsAC, NewsResponseType} from "../redax/News-reducer";
import {isFetchingNewsAC} from "../redax/App-reduser";

export const getFirstNewsTC = (): AppThunk => async dispatch => {
    dispatch(isFetchingNewsAC(true));
    const response = await NewsAPI.getFirstNews();
    let news: NewsResponseType[] = []

    for(let i = 0; i < response.length; i++){
        if (i < response.length - 1) {
            await NewsAPI.getNews(response[i].toString())
                .then(res => {
                    const responseAndId = {...res, id: response[i]}
                    news.push(responseAndId)
                })
        } else {
            await NewsAPI.getNews(response[i].toString())
                .then(res => {
                    const responseAndId = {...res, id: response[i]}
                    news.push(responseAndId)
                    dispatch(isFetchingNewsAC(false))
                })
        }
    }

    dispatch(getNewsAC(news))

}


