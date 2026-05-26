'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useState } from 'react'

const Onboarding = () => {
    const [details, setDetails] = useState<{ goal: string; noOfDays: number[] }>(
        {
            goal: 'general-fitness',
            noOfDays: [3]
        }
    )
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Start your fitness journey!</CardTitle>
                    <CardDescription>Answer a few questions to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label htmlFor="goal">What is your Primary Goal?</Label>
                        <Select value={details?.goal} onValueChange={(val) => setDetails({ ...details, goal: val })}>
                            <SelectTrigger className='w-full mt-3'>
                                <SelectValue placeholder="Select a goal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                                <SelectItem value="flexibility">Flexibility</SelectItem>
                                <SelectItem value="endurance">Endurance</SelectItem>
                                <SelectItem value="general-fitness">General Fitness</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='mt-6'>
                        <div className='flex items-center justify-between'>
                            <Label htmlFor='noOfDays'>How many days a week do you want to work out?</Label>
                            <span className='text-sm text-muted-foreground'>{details?.noOfDays}</span>
                        </div>
                        <Slider
                            id='noOfDays'
                            min={1}
                            max={7}
                            step={1}
                            value={details?.noOfDays}
                            onValueChange={(val: number[]) => setDetails({ ...details, noOfDays: val })}
                            className='w-full mt-3'
                        />
                    </div>
                    <div className='mt-6'>
                        <Button className='w-full' >Generate Workout Plan</Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Onboarding