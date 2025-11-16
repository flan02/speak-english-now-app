//Fijate cómo los client “consumen datos” y los handler “manejan lógica de negocio o base de datos”.
"use client"
import { calendarEvent, formUserData } from "@/lib/types";
import { KY, Method } from ".";
import { API_ROUTES } from "./routes";
import { toGoogleDate } from "@/lib/utils";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { metadata } from "@/app/layout";


export async function handleAccessCode(accessCode: string, setError: (msg: string) => void) {
  //console.log('AccessCode in our frontend', accessCode);
  console.log("URL OBTAINED", `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.ACCESS_CODE}`);
  try {
    const response = await KY(Method.POST, `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.ACCESS_CODE}`, { json: accessCode })
    const data = await response.json();

    //console.log("Google link obtained", data);
    if (data.response.message) {
      setError(data.response.message);
    }
    else {
      window.open(data.response.htmlLink, '_blank', 'noopener,noreferrer');
    }
  } catch (error) {
    console.error("Error fetching access code:", error);
  }
}


interface PaymentSimulationParams {
  setIsLoading: (loading: boolean) => void;
  scheduledTime: any;
  isGroupClass: boolean;
  setIsConfirm: (confirm: boolean) => void; // remove when we are using similated payment Fc
  studentsCount: number;
  text: string;
  price: number; // could be optional in simulated payment
}

export async function simulateSuccessPayment({ setIsLoading, scheduledTime, isGroupClass, studentsCount, text, price }: PaymentSimulationParams) {
  setIsLoading(true);
  try {

    // TODO: Simulate booking event in google api calendar
    const toGoogleCalendarEvent = {
      start: `${toGoogleDate(scheduledTime.start!)}`,
      end: `${toGoogleDate(scheduledTime.end!)}`,
      isGroupClass,
      studentsCount,
      text
    }

    await KY(Method.POST, `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.CALENDAR}`, {
      json: toGoogleCalendarEvent
    })

  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  try {
    const classMetadata = {
      type: isGroupClass ? 'grupo' : 'individual',
      studentsCount: studentsCount == 0 ? 1 : studentsCount,
      price: studentsCount > 2 ? (studentsCount) : price
    }
    //console.log("This is the current metadata", classMetadata);
    const response = await KY(Method.POST, `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.MP}`, {
      json: classMetadata
    })

    const data = await response.json();
    //console.log('response from mercado pago', data.preferenceId);

    if (data.preferenceId) {
      const simulatedParams = new URLSearchParams({
        payment_id: 'TEST1234', // Simulated payment ID
        status: 'success', // Simulated status
        preference_id: data.preferenceId,
      }).toString();

      // * REDIRECT TO CALLBACK SUCCESS PAGE
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/callback/success?${simulatedParams}`;
    }


  } catch (error) {
    console.error("Error simulating payment", error)
  }
};


// * CUSTOM FUNCTION
// export const processMpPayment = async ({ setIsLoading, isGroupClass, setIsConfirm, studentsCount, price }: PaymentSimulationParams) => {
//   setIsLoading(true);

//   const classMetadata = {
//     type: isGroupClass ? 'grupo' : 'individual',
//     studentsCount: studentsCount == 0 ? 1 : studentsCount,
//     price: studentsCount > 2 ? (studentsCount) : price
//   }

//   try {
//     const response = await KY(Method.POST, `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.MP}`, {
//       json: classMetadata
//     })

//     const data = await response.json();
//     console.log('response from mercado pago', data.preferenceId);

//     if (data.preferenceId) {
//       initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

//       const renderPaymentBrick = async (preferenceId: string) => {
//         if (!window.MercadoPago) {
//           console.error("MercadoPago SDK no cargado aún");
//           return;
//         }

//         // Instancia de MercadoPago
//         const mp = new window.MercadoPago(
//           process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!,
//           { locale: "es-AR" }
//         );

//         // Obtener el builder de bricks
//         const bricksBuilder = mp.bricks();

//         // Crear el payment brick
//         await bricksBuilder.create("wallet", "payment-brick", {
//           initialization: { preferenceId: preferenceId, amount: studentsCount > 2 ? (studentsCount) : price },
//           customization: { visual: { style: { theme: "dark" } } },
//           texts: {
//             valueProp: 'smart_option', // muestra “pago rápido con Mercado Pago”
//           },
//           callbacks: {
//             onReady: () => {
//               console.log("Payment Brick listo!");
//             },
//             onError: (error: any) => {
//               console.error("Error en Payment Brick:", error);
//             },
//             onSubmit: () => {
//               console.log("💳 Usuario inició el pago");
//             },
//             onPaymentCompleted: async (paymentData: any) => {
//               console.log("💰 Pago completado:", paymentData);
//               // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito

//               // TODO: Add real value
//               const payment = {
//                 id: paymentData.id,
//                 status: paymentData.status
//               }

//               // * REDIRECT TO CALLBACK SUCCESS PAGE
//               window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/callback/success?payment_id=${payment.id}&status=success`

//               // TODO: Calling to google api calendar to create event (pass date and user)
//               await KY(Method.POST, `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.CALENDAR}`, {})
//             }
//           },
//         });
//       };
//       // TODO: We calling mp api
//       renderPaymentBrick(data.preferenceId);

//       setIsLoading(false);

//       setIsConfirm(true);
//     } else {
//       console.error("No se recibió un ID de preferencia:", data.preferenceId);
//     }
//   } catch (error) {
//     console.error('Error processing payment:', error);
//   }
// }



export const processMpPayment = async ({ setIsLoading, isGroupClass, setIsConfirm, studentsCount, price }: PaymentSimulationParams) => {
  // * RECOMMENDED FC CREATED BY AI
  setIsLoading(true);

  const classMetadata = {
    type: isGroupClass ? "grupo" : "individual",
    studentsCount: studentsCount === 0 ? 1 : studentsCount,
    price: studentsCount > 2 ? price * studentsCount : price,
  };

  try {
    const response = await KY(Method.POST, `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.MP}`, {
      json: classMetadata,
    });

    const data = await response.json();
    console.log("response from mercado pago", data.preferenceId);

    if (data.preferenceId) {
      initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

      const renderPaymentBrick = async (preferenceId: string) => {
        if (!window.MercadoPago) {
          console.error("MercadoPago SDK no cargado aún");
          return;
        }

        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!,
          { locale: "es-AR" }
        );

        const bricksBuilder = mp.bricks();

        await bricksBuilder.create("wallet", "payment-brick", {
          initialization: {
            preferenceId: data.preferenceId,
            amount: classMetadata.price,
          },
          customization: {
            visual: { style: { theme: "dark" } },
          },
          texts: {
            valueProp: "smart_option",
          },
          callbacks: {
            onReady: () => console.log("Payment Brick listo!"),

            onError: (error: any) => {
              console.error("Error en Payment Brick:", error);
              setIsLoading(false);
            },

            onSubmit: () => {
              console.log("Usuario inició el pago");
            },

            onPaymentCompleted: async (paymentData: any) => {
              console.log("Pago completado:", paymentData);

              const payment = {
                id: paymentData.id,
                status: paymentData.status,
              };

              // redirección rápida
              window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/callback/success?` + `payment_id=${payment.id}&status=success`;
            },
          },
        });
      }
      renderPaymentBrick(data.preferenceId);

      setIsLoading(false);
      setIsConfirm(true);
    } else {
      console.error("No se recibió un ID de preferencia:", data.preferenceId);
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    setIsLoading(false);
  }
};


export async function fetchData(isEditing: formUserData, setIsEditing: React.Dispatch<React.SetStateAction<formUserData>>) {
  try {
    const res = await KY(Method.GET, `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.USER_DATA}`);
    //console.log('user data fetched:', res);
    if (res) {
      setIsEditing({
        ...isEditing,
        localidad: res.localidad || '',
        nivel: res.nivel || 'inicial',
        telefono: res.telefono,
        newsletter: res.newsletter || 'no',

      })
    }
  } catch (error) {
    console.error(error);
  }
}

export const fetchEvents = async (setEvents: React.Dispatch<React.SetStateAction<calendarEvent[]>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    const response = await KY(Method.GET, `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.CALENDAR}`)
    setEvents(response)
  } catch (error) {
    console.error("Error fetching calendar events from frontend:", error);
  } finally {
    setIsLoading(false)
  }
}