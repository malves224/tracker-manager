import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PaperResponsive from "../components/PaperResponsive";
import { UsersList } from ".";

function UsersControl() {
  const [currentSubItem, setCurrentSubItem] = React.useState(0);
  const options = [{
    label: "Usuarios",
    component: <UsersList />,
  }, {
    label: "Perfis de acesso",
    component: 
  <div data-testid="perfil-list">
    <h1>Perfis de acesso</h1>,
  </div>

  }];

  const handleChange = (event, newValue) => {
    setCurrentSubItem(newValue);
  };

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`
    };
  }


  return (
    <PaperResponsive>
      <Box
        sx={ {
          marginTop: "10px",
          width: "100%",
          position: "relative",
        } }
      >
        <AppBar position="static" color="default">
          <Tabs
            value={ currentSubItem }
            onChange={ handleChange }
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            {
              options.map(({label}, index) => (
                <Tab key={ label } label={ label } { ...a11yProps(index) } />))
            }
          </Tabs>
        </AppBar>
      </Box>
      {options[currentSubItem].component}
    </PaperResponsive>
  );
}

export default UsersControl;
