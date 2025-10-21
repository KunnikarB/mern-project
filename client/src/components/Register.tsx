import RegisterForm from './RegisterForm';

export default function Register() {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full">
        <RegisterForm />
      </div>
    </div>
  );
}
