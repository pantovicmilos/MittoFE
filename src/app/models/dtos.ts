/* Options:
Date: 2019-08-09 23:24:15
Version: 5.51
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5000

//GlobalNamespace: 
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export class CountryDto
{
    public mcc: string;
    public cc: string;
    public name: string;
    public pricePerSms: number;

    public constructor(init?: Partial<CountryDto>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1, EmitDefaultValue=false)
    public errorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    public fieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    public message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export enum State
{
    Failed = 'Failed',
    Success = 'Success',
}

export class SentSmsDto
{
    public dateTime: string;
    public mcc: string;
    public from: string;
    public to: string;
    public price: number;
    public state: State;

    public constructor(init?: Partial<SentSmsDto>) { (Object as any).assign(this, init); }
}

export class StatisticItemDto
{
    public day: string;
    public mcc: string;
    public pricePerSms: number;
    public count: number;
    public totalPrice: number;

    public constructor(init?: Partial<StatisticItemDto>) { (Object as any).assign(this, init); }
}

export class GetCountriesResponse
{
    public countries: CountryDto[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetCountriesResponse>) { (Object as any).assign(this, init); }
}

export class SendSmsResponse
{
    public state: State;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<SendSmsResponse>) { (Object as any).assign(this, init); }
}

export class GetSentSmsResponse
{
    public items: SentSmsDto[];
    public totalCount: number;
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetSentSmsResponse>) { (Object as any).assign(this, init); }
}

export class GetStatisticsResponse
{
    public statisticsItems: StatisticItemDto[];
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<GetStatisticsResponse>) { (Object as any).assign(this, init); }
}

// @Route("/countries", "GET")
export class GetCountriesRequest implements IReturn<GetCountriesResponse>
{

    public constructor(init?: Partial<GetCountriesRequest>) { (Object as any).assign(this, init); }
    public createResponse() { return new GetCountriesResponse(); }
    public getTypeName() { return 'GetCountriesRequest'; }
}

// @Route("/sms/send", "GET")
export class SendSmsRequest implements IReturn<SendSmsResponse>
{
    public from: string;
    public to: string;
    public text: string;

    public constructor(init?: Partial<SendSmsRequest>) { (Object as any).assign(this, init); }
    public createResponse() { return new SendSmsResponse(); }
    public getTypeName() { return 'SendSmsRequest'; }
}

// @Route("/sms/sent", "GET")
export class GetSentSmsRequest implements IReturn<GetSentSmsResponse>
{
    public dateTimeFrom: string;
    public dateTimeTo: string;
    public skip: number;
    public take: number;

    public constructor(init?: Partial<GetSentSmsRequest>) { (Object as any).assign(this, init); }
    public createResponse() { return new GetSentSmsResponse(); }
    public getTypeName() { return 'GetSentSmsRequest'; }
}

// @Route("/statistics", "GET")
export class GetStatisticsRequest implements IReturn<GetStatisticsResponse>
{
    public dateFrom: string;
    public dateTo: string;
    public mccList: string[];

    public constructor(init?: Partial<GetStatisticsRequest>) { (Object as any).assign(this, init); }
    public createResponse() { return new GetStatisticsResponse(); }
    public getTypeName() { return 'GetStatisticsRequest'; }
}

