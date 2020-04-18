import SearchContainer from "./SearchContainer";
import { connect } from "react-redux";

function mapStateToProps(state: { usersReducer: { token: any; }; }) {
  return { token: state.usersReducer.token };
}

export default connect(mapStateToProps)(SearchContainer);