import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "../../app";
import { Button, Card, Typography } from "antd";
const { Text } = Typography;

function LibraryCard({ match }) {
  const data = useContext(AppContext);
  const library = data.find((item) => item.order === +match.params?.order);

  return (
    <div className="card">
      <Card
        title={library?.territory}
        extra={
          <Link to="/">
            <Button shape="round">Назад</Button>
          </Link>
        }
      >
        <div>
          <Text strong>Наименование:</Text> {library?.fullname}
        </div>
        <div>
          <Text strong>Адрес:</Text> {library?.address}
        </div>
        <div>
          <Text strong>Количество библиотек:</Text> {library?.libraries}
        </div>
      </Card>
    </div>
  );
}

export default withRouter(LibraryCard);
