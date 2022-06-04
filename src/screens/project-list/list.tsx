import React from "react";
import { User } from "./search-panel";

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list: Project[],
    users: User[]
}

export const List = ({ users, list }: ListProps) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>負責人</th>
                </tr>
            </thead>
            <tbody>
                {
                    // list有用到map所以要加key
                    list.map(project => {
                        return (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td>{users.find(user => user.id === project.personId)?.name || "未知"}</td>
                            </tr>    
                        )    
                    })
                }
            </tbody>
        </table>
    );
}