import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PaperResponsive from "../components/PaperResponsive";

function UsersControl() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            value={ value }
            onChange={ handleChange }
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Usuarios" { ...a11yProps(0) } />
            <Tab label="Perfil de acesso" { ...a11yProps(1) } />
          </Tabs>
        </AppBar>
      </Box>
    </PaperResponsive>
  );
}

export default UsersControl;
