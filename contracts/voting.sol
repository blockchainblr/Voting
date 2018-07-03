pragma solidity ^0.4.4;

contract voting 
{
    
   string text;
   int congressDat;
   int bjpDat;
   int otherDat;

  
    function compareStrings (string a, string b) view returns (bool){
       return keccak256(a) == keccak256(b);
   }
    
     function setVote(string data)
    {
        text = data;
        vote();

    }


    function getText() constant returns (string)
    {
        return "default";
    }

    function vote()
    {
       
        if(compareStrings("congress",text))
        {
            congressDat++;
        }
        else if(compareStrings("bjp",text))
        {
            bjpDat++;
        }
        else
        {
            otherDat++;
        }
    }
    
    function getVote() constant returns (string)
    {
        if(congressDat==0 && bjpDat==0 && otherDat==0)
        {
             return "none";
        }
        
        if(congressDat>bjpDat && congressDat>otherDat)
        {
            return "congress";
        }
        else if(bjpDat>congressDat && bjpDat>otherDat)
        {
            return "bjp";
        }
        else
        {
            return "others";
        }
    }

}
