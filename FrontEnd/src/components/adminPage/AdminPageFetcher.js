import axios from "axios";

export default function AdminPageFetcher(url) {
    return axios.get(url, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('Token')}`,
        }}).then((res) => {
            return res.data
        })
};