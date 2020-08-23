import React, { useEffect, useState } from "react";
import { ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import { db } from "../../db";
import "./todos.css";
import "./img.png";
export function Todos() {
  const [todos, setTodos] = useState([]);
  const [bool, setBool] = useState(false);
  useEffect(() => {
    db.collection("todos").onSnapshot(
      (snapShot) => {
        const todoDocs = [];
        snapShot.forEach((doc) => {
          todoDocs.push({ ...doc.data(), id: doc.id });
        });

        setTodos(todoDocs);
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {};
  }, []);
  const removeTodo = async (todo) => {
    if (todo) {
      await db.collection("todos").doc(todo.id).delete();
    }
  };
  const handleTodo = async (todo) => {
    if (todo) {
      await db.collection("todos").doc(todo.id).update({ completed: true });
    }
  };

  return (
    <Container>
      <h1>Todos</h1>
      <ListGroup className="mt-5">
        {todos.map((todo, index) => (
          <ListGroup.Item
            key={index}
            style={{ cursor: "" }}
            variant={todo.completed ? "success" : ""}
            onClick={(e) => handleTodo(todo)}
          >
            <Row>
              <Col>
                <h2>{todo.name}</h2>
              </Col>
              <Col>
                <Button variant="blue" onClick={(e) => removeTodo(todo)}>
                  <h2 className="cross" style={{ cursor: "pointer" }}>
                    ❌
                  </h2>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
