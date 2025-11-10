//Fijate cómo los client “consumen datos” y los handler “manejan lógica de negocio o base de datos”.
"use client"
import { formUserData } from "@/lib/types";
import { KY, Method } from ".";
import { API_ROUTES } from "./routes";
import { toGoogleDate } from "@/lib/utils";

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
  studentsCount: number;
  text: string;
  price?: number;
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
        payment_id: 'TEST1234',
        status: 'success',
        preference_id: data.preferenceId,
      }).toString();

      // * REDIRECT TO CALLBACK SUCCESS PAGE
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/callback/success?${simulatedParams}`;
    }


  } catch (error) {
    console.error("Error simulating payment", error)
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
        newsletter: res.newsletter || 'no'
      })
    }
  } catch (error) {
    console.error(error);
  }
}