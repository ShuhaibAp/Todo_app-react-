import CommonApi from "./CommonApi";
import axios from "axios";

export const TodoList=()=>{
    return CommonApi("GET", "", "http://127.0.0.1:8000/todo/","");
}

export const TodoDet = (id) => {
  return CommonApi("GET", "", `http://127.0.0.1:8000/todo/${id}/`,"");
};

export const AddTodo = (data) => {
  return CommonApi("POST", data, "http://127.0.0.1:8000/todo/","");
};

export const DelTodo = (id) => {
  return CommonApi("DELETE", "", `http://127.0.0.1:8000/todo/${id}/`,"");
};

export const UpdTodo = (id, data) => {
  return CommonApi("PUT", data, `http://127.0.0.1:8000/todo/${id}/`,"");
};

export const UpdStatus = (id, data) => {
  return axios.patch( `http://127.0.0.1:8000/todo/${id}/`,data);
};