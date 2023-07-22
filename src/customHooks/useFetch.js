import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const useFetch = (url) => {
  const [data, PutData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const showSnackBar = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant: variant,
      snackbarprops: 'data-role="alert"',
    });
  };

  const GetData = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND}`)
        .then((data) => {
          PutData(data.data);
        })
        .catch((err) => {
          showSnackBar("Network Error", "error");
        });
    } catch (err) {
      showSnackBar("Something went wrong", "error");
    }
  };

  useEffect(() => {
    GetData();
  }, [url]);

  return [data];
};

export default useFetch;
