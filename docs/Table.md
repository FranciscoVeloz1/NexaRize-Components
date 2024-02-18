# Table component
Welcome to the React Table Component! This component provides a versatile and customizable solution for rendering tabular data in your React applications. With this component, you can easily display and manipulate data in a structured format, offering users a clear and organized view of information.

## Usage

1. Make custom css classes. (also you can use bootstrap, tailwind, or other library with utility classes):
```css
/* App.css */
.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.table-th {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table-td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table-tr:nth-child(even) {
  background-color: #f9f9f9;
}
```

2. Make custom table component with styles using the **Neza table component**:
```typescript
// CustomTable.ts
import { Table, TableConfig, TableStyles } from "nexa-components"; // Importing table component and interfaces

interface Props<T> {
  data: T[];
  config: TableConfig<T>;
}

function CustomTable<T>({ data, config }: Props<T>) {
  // Customs styles for table component based on App.css
  const tableStyles: TableStyles = {
    table: "table",
    tr: "table-tr",
    th: "table-th",
    td: "table-td",
  };

  return <Table styles={tableStyles} data={data} config={config} />;
}

export default CustomTable;
```

3. For this example we are going to use the JSON placeholder [User API](https://jsonplaceholder.typicode.com/users) for show how to render objects within other objects. This is the interface:
```typescript
// IUser.ts
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  [key: string]: string | number | Address | Company; // -> Required for all interfaces for the table component
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
  [key: string]: Geo | string;
}

export interface Geo {
  lat: string;
  lng: string;
  [key: string]: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
  [key: string]: string;
}
```

4. Service for fetch data from the API:

```typescript
// user.service.ts
import { IUser } from "../interfaces/IUser";

export const list = async (): Promise<IUser[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data: IUser[] = await response.json();
  return data;
};
```

5. In the render of the table we are going to add buttons for made actions within the table, and this ones are the styles for that buttons:

```css
/* extras */
.btn-container {
  display: flex;
  gap: 8px;
}

.btn {
  border: none;
  padding: 10px 12px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.btn-success {
  background-color: #40a000;
}

.btn-danger {
  background-color: #dd0000;
}
```

6. Now with all this elements, we can use our new Custom table component:
```typescript
import CustomTable from "../CustomTable"; // Importing table component
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { list } from "../../services/user.services";
import { TableConfig } from "nexa-components"; // Importing interface

const Users = () => {
  const [data, setData] = useState<IUser[]>([]);

  // Gettting users data and saving it on data use state
  const getUsers = async () => {
    try {
      const users = await list();
      setData(users);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // default render of the table rows
  const defaultRender = (item: IUser, field: string) => (
    <div>{`${item[field]}`}</div>
  );

  // custom render for the address object
  const addressRender = (item: IUser, field: string) => {
    const f = field.split("_")[1];
    return <div>{`${item.address[f]}`}</div>;
  };

  // custom render for the geo object
  const geoRender = (item: IUser, field: string) => {
    const f = field.split("_")[1];
    return <div>{`${item.address.geo[f]}`}</div>;
  };

  // custom render for the company object
  const companyRender = (item: IUser, field: string) => {
    const f = field.split("_")[1];
    return <div>{`${item.company[f]}`}</div>;
  };

  // custom render for the actions of the table
  const actionsRender = (item: IUser) => {
    return (
      <div className="btn-container">
        <button onClick={() => alert(item.id)} className="btn btn-success">Edit</button>
        <button onClick={() => alert(item.id)} className="btn btn-danger">Delete</button>
      </div>
    );
  };

  // Table config
  const tableConfig: TableConfig<IUser> = {
    name: { // -> name of the key that we wanna render (IUser.name)
      name: "Name", // -> Name of the column (displayed on the thead)
      render: defaultRender, // -> render
    },
    username: { // -> IUser.username
      name: "Username",
      render: defaultRender,
    },
    address_street: { // -> name of the object_key that we wanna render (IUser.address.street)
      name: "Street",
      render: addressRender, // -> custom render for object address
    },
    geo_lat: { // -> name of the object_key that we wanna render (IUser.address.geo.lat)
      name: "Latitud",
      render: geoRender, // -> custom render for object address.geo
    },
    compamy_name: {
      name: "Company",
      render: companyRender,
    },
    action: { // -> name for extra key that is not inside the original object
      name: "Actions",
      render: actionsRender, // -> custom render for actions
    },
  };

  useEffect(() => {
    getUsers();
  }, []);

  // returning custom table
  return <CustomTable data={data} config={tableConfig} />;
};

export default Users;
```
