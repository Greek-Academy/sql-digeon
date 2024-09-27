import { UserCreationMonths } from "@/entity/user";
import { UserRepositoryAPI } from "@/repository/api/user";
import { UserUseCase } from "@/repository/usecase/user";
import { useMemo, useState, useEffect } from "react";

export const useUserCreationMonths = () => {
    const userRepository = useMemo(() => new UserRepositoryAPI(), []);
    const userUseCase = useMemo(
        () => new UserUseCase(userRepository),
        [userRepository],
    );

    const [ret, setRet] = useState<UserCreationMonths[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const monthsData = await userUseCase.fetchCreationMonths();
                setRet(monthsData);
            } catch (error) {
                setError(error instanceof Error ? error : new Error("An unexpected error occurred"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userUseCase]);

    return { ret, isLoading, error };
}
