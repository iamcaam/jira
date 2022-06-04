import React from "react";

export const List = ({ users, list }) => {

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