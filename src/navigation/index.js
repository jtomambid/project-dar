import React from 'react';
import { useAuth } from "../hooks/useAuth";
import DashboardStack from './DashboardStack';
import AuthStack from './AuthStack';

const RootNavigation = () => {
    const { user } = useAuth();
    return user ? <DashboardStack /> : <AuthStack />
}

export default RootNavigation;