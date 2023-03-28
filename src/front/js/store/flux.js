const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction

      syncTokenFromSessionStore: () => {
        const token = localStorage.getItem("token");
        if (token && token != "" && token != undefined) {
          setStore({ token: token });
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        setStore({ token: null });
        return true;
      },
      login: async (email, password) => {
		
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            `${process.env.BACKEND_URL}/api/login`,
            opts
          );

          if (!resp.ok) {
            getActions().alertmessage("Crendenciales invalidas");
            return false;
          }
          const data = await resp.json();
          setStore({ token: data.token });

          localStorage.setItem("token", data.token);
          setStore({ message: null });
          return true;
        } catch (error) {
          console.error("There has been an error login in");
        }
      },

      register: async (email, password) => {
        console.log(email, password);
        try {
          const resp = await fetch(
            "https://3001-4geeksacade-reactflaskh-jdku0v9nytv.ws-us92.gitpod.io/api/user",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            }
          );
          if (resp.ok) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
        }
      },
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
