import { useEffect, useState } from 'react';
import { getUIQuestions } from './data';

export function useFetchQuoteState() {
  const [quoteStateList, setQuoteStateList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getQuoteStateList = async () => {
      setLoaded(false);
      try {
        const questions = await getUIQuestions('searchCSR');
        const result =
          questions.find(q => q.name === 'quoteState')?.answers || [];
        setQuoteStateList(result);
      } catch {
        setQuoteStateList([]);
      }
      setLoaded(true);
    };
    getQuoteStateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { quoteStateList, loaded };
}
