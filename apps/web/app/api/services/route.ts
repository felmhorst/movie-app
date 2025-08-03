import {withAuth} from "@/lib/withAuth";
import {SERVICE_COLLECTION, USER_COLLECTION} from "@/lib/db";
import {ObjectId} from "mongodb";
import {getCountries} from "@/lib/showsApi";

export const GET = withAuth(async (request, session) => {
    const userId = session.user.id;

    if (!userId)
        return Response.json({error: "Missing session.user.id"}, {status: 400});

    const user = await USER_COLLECTION.findOne(
        {_id: new ObjectId(userId)});

    if (!user)
        return Response.json({error: "User not found"}, {status: 404});

    const {country} = user;

    const count = await SERVICE_COLLECTION.countDocuments({});

    let matchingCountry;
    if (count === 0) {
        const countries = await getCountries();
        matchingCountry = countries.find((_country) => _country.countryCode === country);
    } else {
        matchingCountry = await SERVICE_COLLECTION.findOne({countryCode: country});
    }

    if (!matchingCountry)
        return Response.json({error: "Services for country not found"}, {status: 404});

    const {services} = matchingCountry;
    return Response.json({services}, {status: 200});
});