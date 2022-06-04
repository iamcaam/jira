import * as qs from "qs";
import React, { useEffect, useState }  from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);

    const [param, setParam] = useState({
        name: '',
        personId: ''
    });

    const debouncedParam = useDebounce(param, 200);
    const [list, setList] = useState([]);

    useEffect(() => {
        const reqUrl = `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`;
        fetch(reqUrl).then(async response => {
            if(response.ok) {
                setList(await response.json());
            }
        });
     }, [debouncedParam]);

     // users只需要被執行一次就好
     useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
     });


    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );
}