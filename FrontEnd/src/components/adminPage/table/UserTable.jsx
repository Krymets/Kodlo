import css from "./Table.module.css"
import {useNavigate} from "react-router-dom";
import PaginationButtons from "./PaginationButtons";
import useSWR from "swr";
import AdminPageFetcher from "../AdminPageFetcher";

const COLUMN_NAMES = ["ID", "ФІО", "Пошта", "Телефон"]

const USERS = [
    {
        id: 1,
        name: "Lebron",
        surname: "James",
        person_email: "user123123@user.com",
        phone_number: "+380997777778"
    },
    {
        id: 1,
        name: "Lebron",
        surname: "James",
        person_email: "user123123@user.com",
        phone_number: "+380997777778"
    },
    {
        id: 2222,
        name: "Lebron",
        surname: "James",
        person_email: "user123123@user.com",
        phone_number: "+380997777778"
    },
    {
        id: 1,
        name: "Lebron",
        surname: "James",
        person_email: "user123123@user.com",
        phone_number: "-"
    },
    {
        id: 1,
        name: "Lebron",
        surname: "James",
        person_email: "user123123@user.com",
        phone_number: "+380997777778"
    },
    {
        id: 1,
        name: "Lebron",
        surname: "James",
        person_email: "user123123@user.com",
        phone_number: "+380997777778"
    },

]

function UserTable() {

    const { data: fetchedUsers, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_API_URL}api/admin/users`, AdminPageFetcher);
    let navigate = useNavigate();
    const routeChange = (id) =>{
        let path = `/admin/users/${id}`;
        navigate(path);
    }

    return (
        <div>
            <PaginationButtons></PaginationButtons>
            <table  className={css["table-section"]}>
            <thead>
                <tr className={css["table-header"]}>
                    {COLUMN_NAMES.map((column) =>(
                        <th className={css["table-header__text"]}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {!isLoading && fetchedUsers['results'].map((user) =>(
                    <tr className={css["table-element"]} onClick={() => routeChange(user.id)}>
                        <td className={css["table-element__text"]}>{user.id}</td>
                        <td className={css["table-element__text"]}>{user.surname} {user.name}</td>
                        <td className={css["table-element__text"]}>{user.email}</td>
                        <td className={css["table-element__text"]}>{user.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default UserTable;
