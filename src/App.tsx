import { Button, Form, Select } from 'antd';
import './App.scss';
import ManageShape from './components/manageshape/Manageshape';
import Person from './components/person/Person';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

enum TSession {
  Form,
  MoveIcon,
  Default
}

function App() {
  const [sessionType, setSesstionType] = useState<TSession>(TSession.Default)
  const { t, i18n } = useTranslation();
  const handerChangeLang = (e: any) => {
    i18n.changeLanguage(e)
  }
  return (
    <div className="App">
      <div className='header'>
        <div className='title'>
          {(sessionType === TSession.Form) &&
            <h1>{t('form')}</h1>
          }
          {(sessionType === TSession.MoveIcon) &&
            <h1>{t('layout')}</h1>
          }
        </div>
        <div className='header-manu'>
          {(sessionType !== TSession.Default) &&
            <Button className="form-button" onClick={() => setSesstionType(TSession.Default)}>Back</Button>
          }
          <Form.Item>
            <Select
              defaultValue="en"
              onChange={handerChangeLang}
              style={{ width: 80 }}
              options={[
                { value: 'en', label: 'En' },
                { value: 'th', label: 'Th' },
              ]}
            />
          </Form.Item>
        </div>

      </div>

      <div className="container">
        {sessionType === TSession.Default && <div className='start-session'>
          <Button className="form-button" onClick={() => setSesstionType(TSession.Form)}>{t('form')}</Button>
          <Button className="form-button" onClick={() => setSesstionType(TSession.MoveIcon)}>{t('layout')}</Button>
        </div>}
        {sessionType === TSession.Form && <Person></Person>}
        {sessionType === TSession.MoveIcon && <ManageShape></ManageShape>}
      </div>
    </div>
  );
}

export default App;
