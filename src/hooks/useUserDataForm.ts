// src/hooks/useUserDataForm.ts
'use client'
import { useState, useEffect } from 'react';
import { formUserData } from '@/lib/types';
import { fetchData, handleSaveUserData, handleEditUserData } from '@/services/api/clients';

export const useUserDataForm = () => {
  const [formUpdated, setFormUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initData: formUserData = {
    status: false,
    localidad: '',
    nivel: '',
    telefono: '',
    newsletter: ''
  };
  const [isEditing, setIsEditing] = useState<formUserData>(initData);

  // Efecto para cargar los datos iniciales del usuario
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchData(isEditing, setIsEditing);
      setIsLoading(false);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wrapper para el evento de guardar
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    handleSaveUserData(e, isEditing, setIsEditing, setFormUpdated);
  };

  // Wrapper para el evento de editar
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleEditUserData(e, isEditing, setIsEditing);
  };

  return {
    formUpdated,
    isLoading,
    isEditing,
    setIsEditing, // Lo exportamos para que los inputs puedan modificar el estado
    handleSave,
    handleEdit,
  };
};
