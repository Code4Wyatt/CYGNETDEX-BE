CREATE TABLE IF NOT EXISTS users (
    userId integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    legalName varchar(200) NOT NULL,
    email text NOT NULL,
    dateOfBirth date NOT NULL,
    phoneNumber integer,
    governmentId text,
    userAddress text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
);