import { createTheme } from '@material-ui/core/styles'
import tinycolor from 'tinycolor2';
import { alpha } from "@material-ui/core"
const blue = "#00b0f0"
const lightBlue = "#0aedda"
const white = "#fff"
const black = "#5f5f5f"
const primary = "#3f51b5";
const secondary = "#f50057";
const theme = createTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: secondary
        }
    },
    overrides: {

        MuiTooltip: {
            tooltip: {
                fontSize: "unset",
                fontFamily: "unset",
            }
        },
        MuiTableCell: {
            root: {

                fontFamily: "unset",
                fontSize: "inherit"
                , direction: "rtl"
            },
            head: {
                backgroundColor: blue,
                color: white,
                whiteSpace: "nowrap"
            }
        },
        MuiAutocomplete: {
            inputRoot: {
                paddingRight: "unset !important"
            },

            root: {
                width: "100% !important",
                minWidth: "9rem",
                fontSize: "smaller"
            },
            endAdornment: {
                top: "unset",
                left: 0, right: "unset"
            },
            clearIndicator: {
                display: "none"
            },

            input: {
                textAlign: "unset !important"
            }
        },
        MuiButtonBase: {
            root: {
                color: lightBlue,
                overflow: "hidden",
                minHeight: "4rem",

            },
        },

        MuiTab: {
            root: {
                fontSize: "unset",
                fontFamily: "unset",
                borderRadius: '50px 50px 0 0',
                flexBasis: '50%',
                "&$selected": {
                    backgroundColor: alpha(lightBlue, .1)
                }
            },
            textColorInherit: {
                "&.Mui-selected": {
                    color: blue
                }
            }


        },
        MuiFormLabel: {
            root: {
                fontFamily: "inherit",
                fontSize: "unset",
            }
        },
        MuiInputLabel: {

            formControl: {
                left: "unset"
            }
        },
        MuiButton: {
            root: {
                fontSize: "unset",
                fontFamily: "unset",
            },
            contained: {
                backgroundColor: tinycolor(blue).lighten().lighten().lighten().lighten().toHexString(),
                color: tinycolor(blue).darken().darken().darken().toHexString()
            }
        },

        MuiMenuItem: {
            root: {
                fontSize: "unset",
            },
        },
        MuiListItem: {
            button: {
                color: tinycolor(blue).darken().darken().darken().darken().toHexString(),
            },
        },


        MuiPopover: {
            root: {
                backgroundColor: alpha(black, .2),
            },
            paper: {
                backdropFilter: 'blur(5px)',
            },
        },
        MuiBackdrop: {
            root: {
                backdropFilter: 'blur(30px)',
            },
        },
        MuiListItemText: {
            root: {
                flex: "unset"
            },
            primary: {
                textAlign: "right",
                color: white,
            },
        },
        MuiInput: {
            underline: {
                "&:hover ::before": {


                    borderBottom: `2px solid ${blue}`


                },
                "&:after": {
                    borderBottom: "unset"
                },
                "&:before": {
                    borderBottom: "unset"
                },
            }
        },

        MuiSvgIcon: {
            root: {
                width: "3rem",
                height: "3rem",
            },
            colorPrimary: {
                color: tinycolor(blue).lighten().lighten().lighten().toHexString(),


            },
            colorSecondary: {
                color: tinycolor(blue).darken().toHexString(),
            }
        },
        MuiInput: {
            underline: {
                "&:after": {
                    borderBottom: `2px solid ${blue}`
                },
            },

        },
        MuiCircularProgress: {
            colorSecondary: {
                color: lightBlue
            },
            colorPrimary: {
                color: alpha(black, 0.1)
            }
        },
        MuiInputBase: {
            root: {
                fontSize: "unset",
                fontFamily: "iransans,sans-serif !important", color: "unset"
            },
            input: { textAlign: "center" }
        },

        adornedEnd: {
            paddingRight: "30px !important"
        },
        input: {
            padding: "unset"
        },

        MuiSelect: {
            select: {
                paddingTop: ".5rem",
                paddingBottom: ".5rem",
                "&:focus": {
                    backgroundColor: alpha(blue, 0.05)
                }
            },
            icon: {
                top: "unset", right: "-5px"
            }
        },
        MuiSnackbarContent: {
            action: {
                marginRight: "auto",
                marginLeft: "-8px",
                paddingLeft: "unset",
            },
            root: {
                fontFamily: "unset",
                fontSize: "unset"
            }
        },
        MuiAlert: {
            root: {
                fontSize: "unset",
                fontFamily: "unset",
                alignItems: "center"
            },
            icon: {
                marginRight: "unset",
                marginLeft: "10px"
            },
            action: {
                marginRight: "auto",
                marginLeft: "-8px",
                paddingLeft: "unset",
            },
        },
        MuiTypography: {
            root: {
                fontFamily: "unset !important",
                fontSize: "unset !important"
            }
        }
    }
})

export default theme;