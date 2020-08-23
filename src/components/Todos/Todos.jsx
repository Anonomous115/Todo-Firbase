import React, { useEffect, useState, useContext } from "react";
import { ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import { db } from "../../db";
import { AuthContext } from "../../auth";

export function Todos() {
  const { currentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (currentUser && currentUser.uid) {
      unsubscribe = db
        .collection("todos")
        .where("userId", "==", currentUser.uid)
        .onSnapshot(
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
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser]);

  const removeTodo = async (todo) => {
    if (todo) {
      await db.collection("todos").doc(todo.id).delete();
    }
  };
  const handleTodo = async (todo) => {
    if (todo) {
      await db
        .collection("todos")
        .doc(todo.id)
        .update({ completed: !todo.completed, lastUpdated: Date.now() });
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
              <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="blue" onClick={(e) => removeTodo(todo)}>
                  ❌
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
