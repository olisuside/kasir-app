import { List, ListItem, Card } from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Component } from "react";

export default class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    }
  };

  componentDidMount() {
    axios.get(API_URL + "categories").then((res) => {
      const categories = res.data;
      this.setState({ categories });
    })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { changeCategory, categoryItem } = this.props
    return (
      <Card className="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
        <h1 className="text-2xl px-4 font-bold text-black my-4">Kategori</h1>
        <hr />
        <List>
          {this.state.categories.map((categories) => {
            return <ListItem key={categories.id} onClick={() => changeCategory(categories.nama)}>{categories.nama}</ListItem>
          })}
        </List>
      </Card>
    );
  }
}
