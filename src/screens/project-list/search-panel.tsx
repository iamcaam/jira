import React from "react";

class Users {
    id: string | undefined;
    name: string | undefined;
}

export const SearchPanel = ({ users, param, setParam }) => {

    return (
        <form>
            <div>
            {/* 等同於 setParam(Object.assign({}, param, { name: evt.target.value })) */}
                <input type="text" value={param.name} onChange={                    
                    evt => setParam({
                        ...param,
                        name: evt.target.value
                    })
                }/>
                <select value={param.personId} onChange={                    
                    evt => setParam({
                        ...param,
                        personId: evt.target.value
                    })
                }>
                    <option value={''}>負責人</option>
                    {
                        // users有用到map所以要加key
                        // users.map((user: Users) => <option key={user.id} value={user.id}>{user.name}</option>)
                        users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                    }                    
                </select>
            </div>
        </form>
    );
}