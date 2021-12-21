import * as React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const drawerBleeding = 150;

export default function SwipeableEdgeDrawer(props) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
                keepMounted: true,
                container: document.getElementById("content-block"),
                style: { zIndex: 0 },
            }}
            BackdropProps={{ invisible: true }}
            PaperProps={{
                style: {
                    height: "50%",
                    overflow: "visible",
                },
            }}
            SwipeAreaProps={{
                style: {
                    bottom: "70px",
                    height: drawerBleeding,
                    display: open ? "none" : "block",
                },
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: -drawerBleeding,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: "visible",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <KeyboardArrowUpIcon
                    style={{
                        transform: `${open ? "rotate(180deg)" : ""}`,
                        transition: "transform 0.3s",
                    }}
                    fontSize="large"
                />
                {props.children}
            </div>
        </SwipeableDrawer>
    );
}
