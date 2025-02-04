import ITaskList from "../data_interfaces/ITaskList"
import {
    Box,
    Card,
    CardContent,
    Link,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Container,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";

type TaskListProps = {
    tasks: ITaskList;
    
};

function TaskList({tasks}: TaskListProps) {
 
    return (
        <Container sx={{ marginY: 3 }}>
        </Container>
    );

}

