import React from "react";
import Button from "../components/atoms/button";
import { emit } from "../socket";
import { useGlobalState } from "../state";

export type PlayerData = {
  inscriptionId: string;
  isValid: boolean;
};

const CheckWalletPage = () => {
  const [tracSocket] = useGlobalState("tracSocket");
  const [isTracSocketConnected] = useGlobalState("isTracSocketConnected");

  const [fieldValues, setFieldValues] = React.useState<{
    [key: string]: unknown;
  }>({});

  const [walletData, _setWalletData] = React.useState<PlayerData>();

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValues({
        ...fieldValues,
        [event.target.name]: event.target.value,
      });
    },
    [fieldValues]
  );

  const handleInputBlur = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.target.value === "" || !event.target.value) {
        switch (event.target.name) {
          case "wallet-address":
            event.target.setCustomValidity("Please enter a wallet-address.");
            break;
        }
      } else {
        event.target.setCustomValidity("");
      }
    },
    []
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      console.log("submit check wallet");

      if (tracSocket && isTracSocketConnected) {
        emit({
          socket: tracSocket,
          func: "wallet",
          args: [(fieldValues["wallet-address"] as string).trim()],
          call_id: "fart",
        });

        // console.log("trac data", data);

        // setWalletData({
        //   inscriptionId: fieldValues["wallet-address"] as string,
        //   isValid: data.result as boolean,
        // });
      }
    },
    [fieldValues, tracSocket, isTracSocketConnected]
  );

  return (
    <main className="flex flex-col flex-grow py-8 space-y-8 container-3xl">
      <section>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">
            Check Wallet
          </h1>
          <p className="text-secondary-500 dark:text-secondary-500">
            Check a wallets' Ord Games holdings by searching for a wallet
            address.
          </p>
        </div>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <input
              id="wallet-address"
              name="wallet-address"
              type="text"
              placeholder="Wallet Address"
              required={true}
              className="flex-grow rounded"
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="primary"
              className="border-primary-500 h-[42px]"
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
      {walletData && (
        <section>
          Wallet
          {JSON.stringify(walletData, null, 4)}
          {/* <div
            className={twMerge(
              "flex flex-row items-center p-6 space-x-2 bg-secondary-100 dark:bg-secondary-800 rounded-xl",
              playerData.isValid && "text-green-500",
              !playerData.isValid && "text-red-500"
            )}
          >
            {playerData.isValid ? (
              <HiCheckCircle className="w-8 h-8" />
            ) : (
              <HiXCircle className="w-8 h-8" />
            )}
            <p>
              {"The player with the inscription id "}
              <b>{playerData.inscriptionId}</b>
              {" is "}
              {playerData.isValid ? "a valid player." : "not a valid player."}
            </p>
          </div> */}
        </section>
      )}
    </main>
  );
};

export default CheckWalletPage;

/*
import { io } from 'socket.io-client';

const trac = io('https://ordgames.trac.network', {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 500,
  randomizationFactor: 0,
});


// Error logging:

trac.on('error', (error) => {
  console.log(error);
});

// Handle requests (atm 2 that are ordgames relevant, getGameStats() and getIsValidPlayer()):
// the "call_id" you can choose yourself to determine for what request the response has been.
// for example if you want to render something but you wait for the response, you can set any kind of ID you wish and once it's included in a response, render the demanded parts

trac.emit('get',
                    {
                        func : 'gameStats',
                        args : [$INSCRIPTION-ID],
                        call_id : ''
                    });

trac.emit('get',
                    {
                        func : 'isValidPlayer',
                        args : [$INSCRIPTION-ID],
                        call_id : ''
                    });

// Handle responses:

trac.on('response', (response) => {
  // you'd probably replace this with a switch statement
  if (response.func === '$NAME-OF-FUNCTION-YOU-ORIGINALLY-REQUESTED') {
    console.log(response.result);
  }
}); 
*/

/*


            window.trac = io("https://ordgames.trac.network", {
                autoConnect : true,
                reconnection: true,
                reconnectionDelay: 500,
                econnectionDelayMax : 500,
                randomizationFactor : 0
            });

            window.trac.connect();

            window.trac.on('response', async function(msg){

                console.log(msg);

                switch(msg.func)
                {
                    case 'isValidPlayer':

                        if(msg.result === false)
                        {
                            document.getElementById('validplayer_result').innerHTML = 'Not a valid player';
                            return;
                        }

                        document.getElementById('validplayer_result').innerHTML = 'Valid player';

                        break;

                    case 'gameStats':

                        if(msg.result === null)
                        {
                            document.getElementById('gamestats_result').innerHTML = 'Game not found';
                            return;
                        }

                        document.getElementById('gamestats_result').innerHTML = '<pre>' + JSON.stringify(msg.result, null, 4) + '</pre>';

                        break;

                    case 'inscribedBytes':

                        if(msg.result === null)
                        {
                            document.getElementById('list_inscribed_result').innerHTML = 'Nothing found';
                            return;
                        }

                        let out = '';

                        for(let i = 0; i < msg.result.length; i++)
                        {
                            out += '<div>Number: ' + msg.result[i].number + ' | ID : ' + msg.result[i].id + '</div>';
                        }

                        if(out == '')
                        {
                            out = 'Nothing found';
                        }
                        else
                        {
                            out = '<div style="max-height: 500px; overflow-x: auto;">' + out + '</div>';
                        }

                        document.getElementById('list_inscribed_result').innerHTML = out;

                        break;

                    case 'bytesInscribedLength':

                        if(msg.result === null)
                        {
                            document.getElementById('num_inscribed_result').innerHTML = 'Ordinal not found';
                            return;
                        }

                        document.getElementById('num_inscribed_result').innerHTML = 'The content has been inscribed ' + msg.result + ' times';

                        break;

                    case 'inscribedPosition':

                        if(msg.result === null)
                        {
                            document.getElementById('position_result').innerHTML = 'Ordinal not found';
                            return;
                        }

                        document.getElementById('position_result').innerHTML = 'Inscription position #' + ( msg.result + 1 );

                        break;

                    case 'ordinal':

                        if(msg.result === null)
                        {
                            document.getElementById('number_result').innerHTML = 'Ordinal not found';
                            return;
                        }

                        if(msg.result.content_type.startsWith('image'))
                        {
                            document.getElementById('number_result').innerHTML =
                                '<div><img style="max-width: 300px;" src="data:'+msg.result.content_type+';base64,'+msg.result.content+'"></div>';
                        }
                        else if(msg.result.content_type.startsWith('text/plain'))
                        {
                            document.getElementById('number_result').innerText =
                                decodeURIComponent(escape(atob(msg.result.content)));
                        }
                        else
                        {
                            document.getElementById('number_result').innerText = '';
                        }

                        document.getElementById('number_result').innerHTML +=
                            '<p style="font-size: 16px;"><a style="font-size: 16px;" href="https://ordinals.com/inscription/'+msg.result.id+'" target="_blank">OrdinalsExplorer</a></p>' +
                            '<p style="font-size: 16px;">Content Hash:</p>' +
                            '<p style="font-size: 12px;">'+msg.result.hash+'</p>';

                        break;

                    case 'wallet':

                        if(msg.result === null)
                        {
                            document.getElementById('wallet_result').innerHTML = 'No inscriptions not found';
                            return;
                        }

                        let wallet_out = '';

                        for(let i = 0; i < msg.result.length; i++)
                        {

                            wallet_out += '<div style="margin-bottom: 10px;">#' + msg.result[i].number + '</div>';

                            if(msg.result[i].content_type.startsWith('image'))
                            {
                                wallet_out += '<div><img style="max-width: 300px;" src="data:' + msg.result[i].content_type + ';base64,' + msg.result[i].content + '"></div>';
                            }
                            else if(msg.result[i].content_type.startsWith('text/plain'))
                            {
                                wallet_out += decodeURIComponent(escape(atob(msg.result[i].content)));
                            }

                            wallet_out += '<p style="font-size: 16px;"><a style="font-size: 16px;" href="https://ordinals.com/inscription/'+msg.result[i].id+'" target="_blank">OrdinalsExplorer</a></p>' +
                                '<p style="font-size: 16px;">Content Hash:</p>' +
                                '<p style="font-size: 12px;">'+msg.result[i].hash+'</p>';

                            wallet_out += '<hr/>';
                        }

                        document.getElementById('wallet_result').innerHTML = '<div style="max-height: 500px; overflow-x: auto;">' + wallet_out + '</div>';


                        break;

                    default:
                        document.getElementById('number_result').innerHTML = 'Unexpected result. Please try again.';
                }
            });

            window.trac.on('error', async function(msg){

                console.log(msg);

                switch(msg.func)
                {
                    case 'ordinal':
                        document.getElementById('number_result').innerHTML = 'There has been an error with your request.';
                        break;
                }
            });

            async function getOrdinal(number)
            {
                number = number.trim();

                if(isNaN(parseInt(number)))
                {
                    if(!number.endsWith('i0'))
                    {
                        alert('Please enter a valid inscription number or id.');
                        return;
                    }
                }

                document.getElementById('number_result').innerHTML = 'Please wait...';

                window.trac.emit('get',
                {
                    func : 'ordinal',
                    args : [number],
                    call_id : ''
                });
            }

            async function getWallet(address)
            {
                if((''+address).trim() == '')
                {
                    alert('Please enter a wallet address');
                    return;
                }

                document.getElementById('wallet_result').innerHTML = 'Please wait...';

                window.trac.emit('get',
                    {
                        func : 'wallet',
                        args : [(''+address).trim()],
                        call_id : ''
                    });
            }

            async function getNumInscribed(number)
            {
                number = number.trim();

                if(isNaN(parseInt(number)))
                {
                    if(!number.endsWith('i0'))
                    {
                        alert('Please enter a valid inscription number or id.');
                        return;
                    }
                }

                document.getElementById('num_inscribed_result').innerHTML = 'Please wait...';

                window.trac.emit('get',
                    {
                        func : 'bytesInscribedLength',
                        args : [number],
                        call_id : ''
                    });
            }

            async function getListInscribed(id_or_hash)
            {
                id_or_hash = id_or_hash.trim();

                if(id_or_hash == '')
                {
                    if(!id_or_hash.endsWith('i0'))
                    {
                        alert('Please enter a valid inscription id or sha256 hash.');
                        return;
                    }
                }

                document.getElementById('num_inscribed_result').innerHTML = 'Please wait...';

                window.trac.emit('get',
                    {
                        func : 'inscribedBytes',
                        args : [id_or_hash, 0, 0],
                        call_id : ''
                    });
            }

            async function getInscribedPosition(number_or_id)
            {
                number_or_id = number_or_id.trim();

                if(isNaN(parseInt(number_or_id)))
                {…

*/
