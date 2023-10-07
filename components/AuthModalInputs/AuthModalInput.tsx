import type { ReactElement } from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    city: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}

export default function AuthModalInputs({
  inputs,
  handleChangeInput,
  isSignIn,
}: Props): ReactElement {
  return (
    <div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="w-[49%] rounded border p-2 py-3"
            placeholder="First Name"
            name="firstName"
            value={inputs.firstName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="w-[49%] rounded border p-2 py-3"
            placeholder="Last Name"
            name="lastName"
            value={inputs.lastName}
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          className="w-full rounded border p-2 py-3"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChangeInput}
        />
      </div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="w-[49%] rounded border p-2 py-3"
            placeholder="Phone"
            name="phone"
            value={inputs.phone}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="w-[49%] rounded border p-2 py-3"
            placeholder="City"
            name="city"
            value={inputs.city}
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="w-full rounded border p-2 py-3"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
}
