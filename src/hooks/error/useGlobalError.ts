import { useSetRecoilState } from 'recoil';
import { GlobalErrorState } from '../../schema/globalErrorSchema';

export const useGlobalError = () => {
  const setGlobalError = useSetRecoilState(GlobalErrorState);

  const showError = (error: any) => {
    setGlobalError(error);
  };

  const clearError = () => {
    setGlobalError(null);
  };

  return { showError, clearError };
};
