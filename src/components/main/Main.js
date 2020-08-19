import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Input, List, Button, Icon } from "antd";
import { AppContext } from "../../app";

function compare(a, b, field, asc) {
  if (a[field] < b[field]) {
    return 0 - asc;
  }
  if (a[field] > b[field]) {
    return asc - 1;
  }

  return 0;
}

export default function Main() {
  const data = useContext(AppContext);
  const [visibleList, setVisible] = useState(data);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(["", false]);

  useEffect(() => {
    if (data.length > 0) {
      const str = search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

      const dataFilter = data?.filter((lib) => {
        const regexp = new RegExp("^.*" + str + ".*$", "i");

        return regexp.test(lib.territory);
      });

      setVisible(dataFilter);
    }
  }, [search, data]);

  const sort = (field) => {
    const arr = [...visibleList];
    arr.sort((a, b) => {
      return compare(a, b, field, sortBy[1] ? 1 : -1);
    });

    setVisible(arr);
    setSortBy([field, !sortBy[1]]);
  };

  return (
    <div className="main">
      <h1 className="main-title">Библиотеки</h1>
      <Input
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300 }}
        suffix={<Icon type="search" style={{ color: "rgba(0,0,0,.45)" }} />}
      />
      <div className="lib">
        <List
          header={
            <div className="lib-head">
              <Button
                icon={
                  sortBy[0] === "territory" ? (sortBy[1] ? "up" : "down") : ""
                }
                onClick={() => sort("territory")}
              >
                Регион
              </Button>
              <Button
                icon={
                  sortBy[0] === "libraries" ? (sortBy[1] ? "up" : "down") : ""
                }
                onClick={() => sort("libraries")}
              >
                Кол-во
              </Button>
            </div>
          }
          bordered
          dataSource={visibleList}
          renderItem={(item) => (
            <Link to={`/library/${item.order}`}>
              <List.Item className="lib-row">
                <div>{item.territory}</div>
                <div>{item.libraries}</div>
              </List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  );
}
