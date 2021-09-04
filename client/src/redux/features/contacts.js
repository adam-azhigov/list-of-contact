const initialState = {
  items: [],
  loading: false,
  filter: ''
};

export default function contactsReduser (state = initialState, action) {
  switch (action.type) {
    case "contacts/load/pending":
      return{
        ...state,
        loading: true
      };
    case "contacts/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case "contact/delete/pending":
      return {
        ...state,
      };
    case "contact/delete/fulfilled":
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };

    case "contact/create/pending":
      return {
        ...state,
        loading: true,
      };

    case "contact/create/fulfilled":
      return {
        ...state,
        loading: true,
        items: [action.payload]
      };
    case "contact/edit/pending":
      return {
        ...state,
        editing: true,
      };
    case "contact/edit/fulfilled":
      return {
        ...state,
        editing: false,
        items: state.items.map(item => {
          if(item._id === action.payload.id) {
            return {
              ...item,
              ...action.payload.data
            }
          }
          return item
        })
      };
    case "contact/filter/fulfilled":
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state
  }
}

export const loadContact = () => {
  return async (dispatch) => {
    dispatch({type: "contacts/load/pending" });
    const res = await fetch('http://localhost:5500/contact');
    const json = await res.json()
    dispatch({type: "contacts/load/fulfilled", payload: json})
  }
}


export const deleteContact = (id) => {
  return async (dispatch) => {
    dispatch({type: "contact/delete/pending"});
    await fetch(`http://localhost:5500/contact/delete/${id}`, {
      method: "DELETE"
    });

   dispatch({type: "contact/delete/fulfilled", payload: id })
  }
}


export const postContact = (data) => {
  return  async (dispatch) => {
    dispatch({type: "contact/create/pending"});

    const res = await fetch("http://localhost:5500/contact/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name
      })
    });
    const json = await res.json()
    dispatch({
      type: "contact/create/fulfilled",
      payload: json
    })
    window.location.reload()
  }
}

export const editContact = (id,data) => {
  return async (dispatch) => {
    dispatch({type: "contact/edit/pending"});

    await fetch(`http://localhost:5500/contact/edit/${id}`,{
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name: data.fullName
      }),
    });
    dispatch({ type: "contact/edit/fulfilled", payload: {id, data}});
    window.location.reload()
  }
}

export const setFilterText = text => {
  return {
    type: "contact/filter/fulfilled",
    payload: text
  }
}
