import Swal from "sweetalert2";

export const badContest = (message?: string) => {
  Swal.fire({
    icon: "error",
    title: "Error en el servidor",
    text:
      message ||
      "El servidor no respondió correctamente. Intenta nuevamente más tarde.",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#d33",
  });
};

export const godContest = (message?: string) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: message || "La empresa ha sido modificada correctamente.",
    showCloseButton: true,
    confirmButtonText: "Aceptar",
  });
};
