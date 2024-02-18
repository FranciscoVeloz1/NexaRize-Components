# Table component
Welcome to the React Table Component! This component provides a versatile and customizable solution for rendering tabular data in your React applications. With this component, you can easily display and manipulate data in a structured format, offering users a clear and organized view of information.

## Usage
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

```typescript
import { Table, TableConfig, TableStyles } from "nexa-components";

interface Props<T> {
  data: T[];
  config: TableConfig<T>;
}

function CustomTable<T>({ data, config }: Props<T>) {
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

```typescript
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  [key: string]: string | number | Address | Company;
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

```typescript
import { IUser } from "../interfaces/IUser";

export const list = async (): Promise<IUser[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data: IUser[] = await response.json();
  return data;
};
```

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

```typescript
import CustomTable from "../CustomTable";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { list } from "../../services/user.services";
import { TableConfig } from "nexa-components";

const Users = () => {
  const [data, setData] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const users = await list();
      setData(users);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const defaultRender = (item: IUser, field: string) => (
    <div>{`${item[field]}`}</div>
  );

  const addressRender = (item: IUser, field: string) => {
    const f = field.split("_")[1];
    return <div>{`${item.address[f]}`}</div>;
  };

  const geoRender = (item: IUser, field: string) => {
    const f = field.split("_")[1];
    return <div>{`${item.address.geo[f]}`}</div>;
  };

  const companyRender = (item: IUser, field: string) => {
    const f = field.split("_")[1];
    return <div>{`${item.company[f]}`}</div>;
  };

  const actionsRender = (item: IUser) => {
    return (
      <div className="btn-container">
        <button onClick={() => alert(item.id)} className="btn btn-success">Edit</button>
        <button onClick={() => alert(item.id)} className="btn btn-danger">Delete</button>
      </div>
    );
  };

  const tableConfig: TableConfig<IUser> = {
    name: {
      name: "Name",
      render: defaultRender,
    },
    username: {
      name: "Username",
      render: defaultRender,
    },
    address_street: {
      name: "Street",
      render: addressRender,
    },
    geo_lat: {
      name: "Latitud",
      render: geoRender,
    },
    compamy_name: {
      name: "Company",
      render: companyRender,
    },
    action: {
      name: "Actions",
      render: actionsRender,
    },
  };

  useEffect(() => {
    getUsers();
  }, []);

  return <CustomTable data={data} config={tableConfig} />;
};

export default Users;
```
